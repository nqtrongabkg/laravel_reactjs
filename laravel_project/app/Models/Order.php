<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table = 'db_order';

    public function orderdetail()
    {
        return $this->hasMany(Orderdetail::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    protected $fillable = [
        'user_id',
        'delivery_name',
        'delivery_gender',
        'delivery_email',
        'delivery_phone',
        'delivery_address',
        'note',
        'created_by',
        'updated_by',
        'status',
    ];
}