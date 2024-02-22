<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Menu;
use Illuminate\Support\Str;

class MenuController extends Controller
{
    function index()
    {
        $menus = Menu::where('status', '!=', 0)
        ->orderBy('sort_order', 'asc')
        ->select('*')
        ->get();
        $total = Menu::count();
        $result = [
            'status' => true,
            'menus' => $menus,
            'message' => 'Tai lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    function indextrash()
    {
        $menus = Menu::where('status', 0)
        ->orderBy('sort_order', 'asc')
            ->select('*')
            ->get();
        $total = Menu::count();
        $result = [
            'status' => true,
            'menus' => $menus,
            'message' => 'Tai lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    function show($id)
    {
        $menu = Menu::find($id);
        if ($menu == null) {
            $result = [
                'status' => false,
                'menu' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'menu' => $menu,
            'message' => 'Tai du lieu thanh cong',
        ];
        return response()->json($result, 200);
    }

    function store(Request $request)
    {
        $menu = new Menu();
        $menu->name = $request->name;
        $menu->link = $request->link;
        $menu->sort_order = $request->sort_order;
        $menu->parent_id = $request->parent_id ? $request->parent_id : null;
        $menu->type = $request->type;
        $menu->table_id = $request->table_id ? $request->table_id : null;
        $menu->description = $request->description;
        $menu->created_by = 1;
        $menu->created_at = date('Y-m-d H:i:s');
        $menu->status = $request->status;
        if ($menu->save()) {
            // Successfully saved
            $result = [
                'status' => true,
                'menu' => $menu,
                'message' => 'Them du lieu thanh cong',
            ];
            return response()->json($result, 200);
        } else {
            // Failed to save
            $result = [
                'status' => false,
                'menu' => null,
                'message' => 'Khong the them du lieu',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'menu' => null,
            'message' => 'Khong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $menu = Menu::find($id);
        if ($menu == null) {
            $result = [
                'status' => false,
                'menu' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        $menu->name = $request->name;
        $menu->link = $request->link;
        $menu->sort_order = $request->sort_order;
        $menu->parent_id = $request->parent_id ? $request->paren : null;
        $menu->type = $request->type;
        $menu->table_id = $request->table_id ? $request->table_id : null;
        $menu->description = $request->description;
        $menu->updated_by = 1;
        $menu->status = $request->status;
        $menu->updated_at = date('Y-m-d H:i:s');
        if ($menu->save()) {
            $result = [
                'status' => true,
                'menu' => $menu,
                'message' => 'Cap nha du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'menu' => null,
            'message' => 'Khong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    function status($id)
    {
        $menu = Menu::find($id);
        if ($menu == null) {
            $result = [
                'status' => false,
                'menu' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $menu->status = ($menu->status == 1) ? 2 : 1;
        $menu->updated_at = date('Y-m-d H:i:s');
        $menu->updated_by = 1;
        if ($menu->save()) {
            $result = [
                'status' => true,
                'menu' => $menu,
                'message' => 'Cap nhat du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'menu' => null,
            'message' => 'Khong the cap nhat du lieu',
        ];
        return response()->json($result, 200);
    }

    function trash($id)
    {
        $menu = Menu::find($id);
        if ($menu == null) {
            $result = [
                'status' => false,
                'menu' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $menu->status = ($menu->status == 0) ? 1 : 0;
        $menu->updated_at = date('Y-m-d H:i:s');
        $menu->updated_by = 1;
        if ($menu->save()) {
            $result = [
                'status' => true,
                'brand' => $menu,
                'message' => 'Cap nhat du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'menu' => null,
            'message' => 'Khong the cap nhat du lieu',
        ];
        return response()->json($result, 200);
    }

    function destroy($id)
    {
        $menu = Menu::find($id);
        if ($menu == null) {
            $result = [
                'status' => false,
                'menu' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        if ($menu->delete()) {
            $result = [
                'status' => true,
                'menu' => $menu,
                'message' => 'Cap nha du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'menu' => null,
            'message' => 'Khoong the them du lieu',
        ];
        return response()->json($result, 200);
    }
}