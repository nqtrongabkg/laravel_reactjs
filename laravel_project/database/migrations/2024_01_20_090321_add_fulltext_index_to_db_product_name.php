<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Thêm FULLTEXT index vào cột 'name' trong bảng 'db_product'
        Schema::table('db_product', function (Blueprint $table) {
            $table->index(['name'], 'name_fulltext_index');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Xoá FULLTEXT index nếu cần
        Schema::table('db_product', function (Blueprint $table) {
            $table->dropIndex('name_fulltext_index');
        });
    }
};