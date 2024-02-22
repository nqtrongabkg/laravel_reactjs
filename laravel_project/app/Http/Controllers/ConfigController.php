<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Config;
use Illuminate\Support\Str;

class ConfigController extends Controller
{
    function show($id)
    {
        $config = Config::find($id);
        if ($config == null) {
            $result = [
                'status' => false,
                'config' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'config' => $config,
            'message' => 'Tai du lieu thanh cong',
        ];
        return response()->json($result, 200);
    }
    function update(Request $request, $id)
    {
        $config  = Config ::find($id);
        if ($config  == null) {
            $result = [
                'status' => false,
                'config ' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        $config ->author = $request->author; // reactjs
        $config ->email = $request->email;
        $config ->phone = $request->phone; // reactjs
        $config ->zalo = $request->zalo; // reactjs
        $config ->facebook = $request->facebook; // reactjs
        $config ->address = $request->address; // reactjs
        $config ->youtube = $request->youtube; // reactjs
        $config->metadesc = $request->metadesc; // reactjs
        $config->metakey = $request->metakey; // reactjs
        $config ->updated_at = date('Y-m-d H:i:s');
        $config ->updated_by = 1; // tam
        $config ->status = 1; // reactjs
        if ($config ->save()) {
            $result = [
                'status' => true,
                'config ' => $config ,
                'message' => 'Cap nha du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'config ' => null,
            'message' => 'Khoong the them du lieu',
        ];
        return response()->json($result, 200);
    }
}