<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    function index()
    {
        $categories = Category::where('status', '!=', 0)
        ->orderBy('sort_order', 'asc')
        ->select('id', 'name', 'slug', 'status', 'image', 'description')
        ->get();
        $total = Category::count();
        $result = [
            'status' => true,
            'categories' => $categories,
            'message' => 'Tai lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    function indextrash()
    {
        $categories = Category::where('status', 0)
        ->orderBy('sort_order', 'asc')
        ->select('id', 'name', 'slug', 'status', 'image', 'description')
        ->get();
        $total = Category::count();
        $result = [
            'status' => true,
            'categories' => $categories,
            'message' => 'Tai lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    function show($id)
    {
        $category = Category::find($id);
        if ($category == null) {
            $result = [
                'status' => false,
                'category' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'category' => $category,
            'message' => 'Tai du lieu thanh cong',
        ];
        return response()->json($result, 200);
    }

    function store(Request $request)
    {
        $category = new Category();
        $category->name = $request->name; // reactjs
        $category->slug = Str::of($request->name)->slug('-');
        // upload file -- reactjs
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/category'), $fileName);
                $category->image = $fileName;
            }
        }
        // end upload flie
        $category->sort_order = $request->sort_order; // reactjs
        $category->description = $request->description; // reactjs
        $category->created_at = date('Y-m-d H:i:s');
        $category->created_by = 1; // tam
        $category->parent_id = 1; // tam
        $category->status = $request->status; // reactjs
        if ($category->save()) {
            $result = [
                'status' => true,
                'category' => $category,
                'message' => 'Them du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'category' => null,
            'message' => 'Khoong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $category = Category::find($id);
        if ($category == null) {
            $result = [
                'status' => false,
                'category' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        $category->name = $request->name; // reactjs
        $category->slug = Str::of($request->name)->slug('-');
        // upload file -- reactjs
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/category'), $fileName);
                $category->image = $fileName;
            }
        }
        $category->sort_order = $request->sort_order; // reactjs
        $category->description = $request->description; // reactjs
        $category->updated_at = date('Y-m-d H:i:s');
        $category->updated_by = 1; // tam
        $category->parent_id = 1; // tam
        $category->status = $request->status; // reactjs
        if ($category->save()) {
            $result = [
                'status' => true,
                'category' => $category,
                'message' => 'Cap nha du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'category' => null,
            'message' => 'Khoong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    function status($id)
    {
        $category = Category::find($id);
        if ($category == null) {
            $result = [
                'status' => false,
                'category' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $category->status = ($category->status == 1) ? 2 : 1;
        $category->updated_at = date('Y-m-d H:i:s');
        $category->updated_by = 1;
        if ($category->save()) {
            $result = [
                'status' => true,
                'category' => $category,
                'message' => 'Cap nhat du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'category' => null,
            'message' => 'Khong the cap nhat du lieu',
        ];
        return response()->json($result, 200);
    }

    function trash($id)
    {
        $category = Category::find($id);
        if ($category == null) {
            $result = [
                'status' => false,
                'category' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $category->status = ($category->status == 0) ? 1 : 0;
        $category->updated_at = date('Y-m-d H:i:s');
        $category->updated_by = 1;
        if ($category->save()) {
            $result = [
                'status' => true,
                'category' => $category,
                'message' => 'Cập nhật dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'category' => null,
            'message' => 'Khong the cap nhat du lieu',
        ];
        return response()->json($result, 200);
    }

    function destroy($id)
    {
        $category = Category::find($id);
        if ($category == null) {
            $result = [
                'status' => false,
                'category' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        if ($category->delete()) {
            $result = [
                'status' => true,
                'category' => $category,
                'message' => 'Xóa dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'category' => null,
            'message' => 'Khong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    public function searchLikeName(Request $request)
    {
        $query = $request->input('query');

        $categories = Category::where('status', '!=', 0)
        ->where('name', 'LIKE', '%' . $query . '%')
            ->orderBy('created_at', 'desc')
            ->get();

        $total = $categories->count();

        $result = [
            'status' => true,
            'categories' => $categories,
            'message' => 'Tải dữ liệu thành công',
            'total' => $total
        ];

        return response()->json($result, 200);
    }
}