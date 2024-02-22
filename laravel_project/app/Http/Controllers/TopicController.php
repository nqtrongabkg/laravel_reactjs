<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Topic;
use Illuminate\Support\Str;

class TopicController extends Controller
{
    function index()
    {
        $topics = Topic::where('status', '!=', 0)
            ->orderBy('created_at', 'desc')
            ->select('*')
            ->get();
        $total = Topic::count();
        $result = [
            'status' => true,
            'topics' => $topics,
            'message' => 'Tai lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    function show($id)
    {
        $topic = Topic::find($id);
        if ($topic == null) {
            $result = [
                'status' => false,
                'topic' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'topic' => $topic,
            'message' => 'Tai du lieu thanh cong',
        ];
        return response()->json($result, 200);
    }

    function store(Request $request)
    {
        $topic = new Topic();
        $topic->name = $request->name; // reactjs
        $topic->slug = Str::of($request->name)->slug('-');


        $topic->sort_order = $request->sort_order; // reactjs
        $topic->description = $request->description; // reactjs
        $topic->created_at = date('Y-m-d H:i:s');
        $topic->created_by = 1; // tam
        $topic->status = $request->status; // reactjs
        if ($topic->save()) {
            $result = [
                'status' => true,
                'topic' => $topic,
                'message' => 'Them du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'topic' => null,
            'message' => 'Khoong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $topic = Topic::find($id);
        if ($topic == null) {
            $result = [
                'status' => false,
                'topic' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $topic->name = $request->name;
        $topic->slug = Str::of($request->name)->slug('-');
        $topic->sort_order = $request->sort_order;
        $topic->description = $request->description;
        $topic->updated_by = $request->updated_by;
        $topic->status = $request->status;
        $topic->updated_at = date('Y-m-d H:i:s');
        if ($topic->save()) {
            $result = [
                'status' => true,
                'topic' => $topic,
                'message' => 'Cap nha du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'topic' => null,
            'message' => 'Khoong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    function status($id)
    {
        $topic = Topic::find($id);
        if ($topic == null) {
            $result = [
                'status' => false,
                'topic' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $topic->status = ($topic->status == 1) ? 2 : 1;
        $topic->updated_at = date('Y-m-d H:i:s');
        $topic->updated_by = 1;
        if ($topic->save()) {
            $result = [
                'status' => true,
                'topic' => $topic,
                'message' => 'Cap nhat du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'topic' => null,
            'message' => 'Khong the cap nhat du lieu',
        ];
        return response()->json($result, 200);
    }

    function destroy($id)
    {
        $topic = Topic::find($id);
        if ($topic == null) {
            $result = [
                'status' => false,
                'topic' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        if ($topic->delete()) {
            $result = [
                'status' => true,
                'topic' => $topic,
                'message' => 'Cap nha du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'topic' => null,
            'message' => 'Khoong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    function indextrash()
    {
        $topics = Topic::where('status', 0)
        ->orderBy('created_at', 'desc')
        ->select('*')
        ->get();
        $total = Topic::count();
        $result = [
            'status' => true,
            'topics' => $topics,
            'message' => 'Tai lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    function trash($id)
    {
        $topic = Topic::find($id);
        if ($topic == null) {
            $result = [
                'status' => false,
                'topic' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $topic->status = ($topic->status == 0) ? 1 : 0;
        $topic->updated_at = date('Y-m-d H:i:s');
        $topic->updated_by = 1;
        if ($topic->save()) {
            $result = [
                'status' => true,
                'topic' => $topic,
                'message' => 'Cap nhat du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'topic' => null,
            'message' => 'Khong the cap nhat du lieu',
        ];
        return response()->json($result, 200);
    }
}