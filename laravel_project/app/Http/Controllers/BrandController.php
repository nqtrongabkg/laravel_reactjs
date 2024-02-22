<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Brand;
use Illuminate\Support\Str;

class BrandController extends Controller
{
    function index()
    {
        $brands = Brand::where('status', '!=', 0)
            ->orderBy('created_at', 'desc')
            ->select('*')
            ->get();
        $total = Brand::count();
        $result = [
            'status' => true,
            'brands' => $brands,
            'message' => 'Tai lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    function show($id)
    {
        $brand = Brand::find($id);
        if ($brand == null) {
            $result = [
                'status' => false,
                'brand' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'brand' => $brand,
            'message' => 'Tai du lieu thanh cong',
        ];
        return response()->json($result, 200);
    }

    function store(Request $request)
    {
        $brand = new Brand();
        $brand->name = $request->name; // reactjs
        $brand->slug = Str::of($request->name)->slug('-');
        // upload file -- reactjs
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/brand'), $fileName);
                $brand->image = $fileName;
            }
        }
        // end upload

        $brand->sort_order = $request->sort_order; // reactjs
        $brand->description = $request->description; // reactjs
        $brand->created_at = date('Y-m-d H:i:s');
        $brand->created_by = 1; // tam
        $brand->status = $request->status; // reactjs
        if ($brand->save()) {
            $result = [
                'status' => true,
                'brand' => $brand,
                'message' => 'Them du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'brand' => null,
            'message' => 'Khoong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $brand = Brand::find($id);
        if ($brand == null) {
            $result = [
                'status' => false,
                'brand' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        $brand->name = $request->name; // reactjs
        $brand->slug = Str::of($request->name)->slug('-');
        // upload file -- reactjs
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/brand'), $fileName);
                $brand->image = $fileName;
            }
        }
        $brand->sort_order = $request->sort_order; // reactjs
        $brand->description = $request->description; // reactjs
        $brand->updated_at = date('Y-m-d H:i:s');
        $brand->updated_by = 1; // tam
        $brand->status = $request->status; // reactjs
        if ($brand->save()) {
            $result = [
                'status' => true,
                'brand' => $brand,
                'message' => 'Cap nha du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'brand' => null,
            'message' => 'Khoong the them du lieu',
        ];
        return response()->json($result, 200);
    }
    
    //api đổi trạng thái của brand
    function status($id)
    {
        $brand = Brand::find($id);
        if ($brand == null) {
            $result = [
                'status' => false,
                'brand' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $brand->status = ($brand->status == 1) ? 2 : 1;
        $brand->updated_at = date('Y-m-d H:i:s');
        $brand->updated_by = 1; //tam
        if ($brand->save()) {
            $result = [
                'status' => true,
                'brand' => $brand,
                'message' => 'Cap nhat du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'brand' => null,
            'message' => 'Khong the cap nhat du lieu',
        ];
        return response()->json($result, 200);
    }

    function destroy($id)
    {
        $brand = Brand::find($id);
        if ($brand == null) {
            $result = [
                'status' => false,
                'brand' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        if ($brand->delete()) {
            $result = [
                'status' => true,
                'brand' => $brand,
                'message' => 'Cap nha du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'brand' => null,
            'message' => 'Khoong the them du lieu',
        ];
        return response()->json($result, 200);
    }
    function trash($id)
    {
        $brand = Brand::find($id);
        if ($brand == null) {
            $result = [
                'status' => false,
                'brand' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $brand->status = ($brand->status == 0) ? 1 : 0;
        $brand->updated_at = date('Y-m-d H:i:s');
        $brand->updated_by = 1;
        if ($brand->save()) {
            $result = [
                'status' => true,
                'brand' => $brand,
                'message' => 'Cập nhật dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'brand' => null,
            'message' => 'Khong the cap nhat du lieu',
        ];
        return response()->json($result, 200);
    }
    function indextrash()
    {
        $brands = Brand::where('status', 0)
        ->orderBy('created_at', 'desc')
        ->select('*')
            ->get();
        $total = Brand::count();
        $result = [
            'status' => true,
            'brands' => $brands,
            'message' => 'Tai lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
}