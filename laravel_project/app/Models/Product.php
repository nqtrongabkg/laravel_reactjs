<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'db_product';
    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id', 'id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }


    public function productSales()
    {
        return $this->hasMany(ProductSale::class,'product_id', 'id');
    }

    public function productStores()
    {
        return $this->hasMany(ProductStore::class, 'product_id', 'id');
    }
}