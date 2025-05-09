var express = require('express');
var router = express.Router();
const SanPham = require('./schemas/sanPham');

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
            price: p.Gia,
            oldPrice: p.GiaGoc,
            discount: p.GiaGoc ? Math.round((p.GiaGoc - p.Gia) / p.GiaGoc * 100) : 0,
            image: p.HinhAnh[0],
            rating: p.DanhGia || 0,
            reviewCount: p.SoLuotDanhGia || 0,
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

module.exports = router; 