<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Banner;
use Illuminate\Support\Str;

class BannerController extends Controller
{
    function index()
    {
        $banners = Banner::where('status', '!=', 0)
            ->orderBy('created_at', 'desc')
            ->select('*')
            ->get();
        $total = Banner::count();
        $result = [
            'status' => true,
            'banners' => $banners,
            'message' => 'Tai lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    function show($id)
    {
        $banner = Banner::find($id);
        if ($banner == null) {
            $result = [
                'status' => false,
                'banner' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'banner' => $banner,
            'message' => 'Tai du lieu thanh cong',
        ];
        return response()->json($result, 200);
    }

    function store(Request $request)
    {
        $banner = new Banner();
        $banner->name = $request->name; // reactjs
        // upload file -- reactjs
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/banner'), $fileName);
                $banner->image = $fileName;
            }
        }
        // end upload

        $banner->link = $request->link; // reactjs
        $banner->position = $request->position; // reactjs
        $banner->description = $request->description; // reactjs
        $banner->created_at = date('Y-m-d H:i:s');
        $banner->created_by = 1; // tam
        $banner->status = $request->status; // reactjs
        if ($banner->save()) {
            $result = [
                'status' => true,
                'banner' => $banner,
                'message' => 'Them du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'banner' => null,
            'message' => 'Khoong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $banner = Banner::find($id);
        if ($banner == null) {
            $result = [
                'status' => false,
                'banner' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        $banner->name = $request->name; // reactjs
        // upload file -- reactjs
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/banner'), $fileName);
                $banner->image = $fileName;
            }
        }
        $banner->link = $request->link; // reactjs
        $banner->position = $request->position; // reactjs
        $banner->description = $request->description; // reactjs
        $banner->updated_at = date('Y-m-d H:i:s');
        $banner->updated_by = 1; // tam
        $banner->status = $request->status; // reactjs
        if ($banner->save()) {
            $result = [
                'status' => true,
                'banner' => $banner,
                'message' => 'Cap nha du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'banner' => null,
            'message' => 'Khong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    function status($id)
    {
        $banner = Banner::find($id);
        if ($banner == null) {
            $result = [
                'status' => false,
                'banner' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $banner->status = ($banner->status == 1) ? 2 : 1;
        $banner->updated_at = date('Y-m-d H:i:s');
        $banner->updated_by = 1; //tam
        if ($banner->save()) {
            $result = [
                'status' => true,
                'banner' => $banner,
                'message' => 'Cap nhat du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'banner' => null,
            'message' => 'Khong the cap nhat du lieu',
        ];
        return response()->json($result, 200);
    }

    function destroy($id)
    {
        $banner = Banner::find($id);
        if ($banner == null) {
            $result = [
                'status' => false,
                'banner' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        if ($banner->delete()) {
            $result = [
                'status' => true,
                'banner' => $banner,
                'message' => 'Cap nha du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'banner' => null,
            'message' => 'Khong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    function indextrash()
    {
        $banners = Banner::where('status', 0)
        ->orderBy('created_at', 'desc')
        ->select('*')
            ->get();
        $total = Banner::count();
        $result = [
            'status' => true,
            'banners' => $banners,
            'message' => 'Tai lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    function trash($id)
    {
        $banner = Banner::find($id);
        if ($banner == null) {
            $result = [
                'status' => false,
                'banner' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $banner->status = ($banner->status == 0) ? 1 : 0;
        $banner->updated_at = date('Y-m-d H:i:s');
        $banner->updated_by = 1; //tam
        if ($banner->save()) {
            $result = [
                'status' => true,
                'banner' => $banner,
                'message' => 'Cap nhat du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'banner' => null,
            'message' => 'Khong the cap nhat du lieu',
        ];
        return response()->json($result, 200);
    }
}