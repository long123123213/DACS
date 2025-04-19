var express = require('express');
var router = express.Router();
const SanPham = require('./schemas/sanPham');
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    try {
        // Get query parameters
        const { category, minPrice, maxPrice, brand, sort, page = 1, search } = req.query;
        const limit = 9; // Products per page

        // Build query
        let query = {};
        
        // Category filter
        if (category) {
            query.DanhMuc = category;
        }

        // Price filter
        if (minPrice || maxPrice) {
            query.Gia = {};
            if (minPrice) query.Gia.$gte = parseInt(minPrice);
            if (maxPrice) query.Gia.$lte = parseInt(maxPrice);
        }

        // Brand filter
        if (brand) {
            query.ThuongHieu = brand;
        }

        // Search
        if (search) {
            query.$or = [
                { TenSP: { $regex: search, $options: 'i' } },
                { MoTa: { $regex: search, $options: 'i' } }
            ];
        }

        // Sort options
        let sortOption = {};
        switch (sort) {
            case 'price-asc':
                sortOption = { Gia: 1 };
                break;
            case 'price-desc':
                sortOption = { Gia: -1 };
                break;
            case 'newest':
                sortOption = { NgayTao: -1 };
                break;
            case 'bestseller':
                sortOption = { LuotMua: -1 };
                break;
            default:
                sortOption = { NgayTao: -1 };
        }

        // Execute query with pagination
        const skip = (page - 1) * limit;
        const products = await SanPham.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        // Get total count for pagination
        const total = await SanPham.countDocuments(query);
        const pages = Math.ceil(total / limit);

        // Get categories with count
        const categories = await SanPham.aggregate([
            { $group: { _id: '$DanhMuc', count: { $sum: 1 } } }
        ]);

        // Get brands with count
        const brands = await SanPham.aggregate([
            { $group: { _id: '$ThuongHieu', count: { $sum: 1 } } }
        ]);

        // Format products for display
        const formattedProducts = products.map(p => ({
            id: p._id,
            name: p.TenSP,
            price: Number(p.Gia) || 0,
            oldPrice: Number(p.GiaGoc) || 0,
            discount: p.GiaGoc ? Math.round((p.GiaGoc - p.Gia) / p.GiaGoc * 100) : 0,
            image: p.HinhAnh && p.HinhAnh.length > 0 ? p.HinhAnh[0] : '',
            rating: Number(p.DanhGia) || 0,
            reviewCount: Number(p.SoLuotDanhGia) || 0,
            isNew: (new Date() - new Date(p.NgayTao)) / (1000 * 60 * 60 * 24) <= 7
        }));

        res.render('shop', {
            products: formattedProducts,
            categories,
            brands,
            currentPage: page,
            totalPages: pages,
            currentCategory: category,
            currentBrand: brand,
            currentSort: sort,
            minPrice,
            maxPrice,
            search
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi server!');
    }
});

// Product detail page
router.get('/product/:id', async (req, res) => {
    try {
        const product = await SanPham.findById(req.params.id);
        if (!product) {
            return res.status(404).render('error', { 
                message: 'Không tìm thấy sản phẩm',
                error: { status: 404 }
            });
        }

        // Format product data
        const formattedProduct = {
            id: product._id,
            name: product.TenSP,
            sku: product.MaSP || 'N/A',
            description: product.MoTa || '',
            price: Number(product.Gia) || 0,
            oldPrice: Number(product.GiaGoc) || 0,
            discount: product.GiaGoc ? Math.round((product.GiaGoc - product.Gia) / product.GiaGoc * 100) : 0,
            mainImage: product.HinhAnh && product.HinhAnh.length > 0 ? product.HinhAnh[0] : '',
            images: product.HinhAnh || [],
            brand: product.ThuongHieu || 'N/A',
            origin: product.XuatXu || 'N/A',
            material: product.ChatLieu || 'N/A',
            style: product.PhongCach || 'N/A',
            stock: Number(product.SoLuong) || 0,
            rating: Number(product.DanhGia) || 0,
            reviewCount: Number(product.SoLuotDanhGia) || 0,
            colors: [
                { name: 'Đen', code: '#000000' },
                { name: 'Trắng', code: '#FFFFFF' },
                { name: 'Xanh', code: '#00aeff' },
                { name: 'Đỏ', code: '#ff4757' }
            ]
        };

        // Fetch related products
        const relatedProducts = await SanPham.find({
            DanhMuc: product.DanhMuc,
            _id: { $ne: product._id }
        }).limit(4);

        // Format related products
        const formattedRelatedProducts = relatedProducts.map(p => ({
            id: p._id,
            name: p.TenSP,
            price: Number(p.Gia) || 0,
            oldPrice: Number(p.GiaGoc) || 0,
            discount: p.GiaGoc ? Math.round((p.GiaGoc - p.Gia) / p.GiaGoc * 100) : 0,
            image: p.HinhAnh && p.HinhAnh.length > 0 ? p.HinhAnh[0] : ''
        }));

        res.render('product-detail', { 
            product: formattedProduct,
            relatedProducts: formattedRelatedProducts
        });
    } catch (error) {
        console.error('Error in product detail route:', error);
        res.status(500).render('error', {
            message: 'Đã xảy ra lỗi khi tải thông tin sản phẩm',
            error: { status: 500 }
        });
    }
});

module.exports = router; 