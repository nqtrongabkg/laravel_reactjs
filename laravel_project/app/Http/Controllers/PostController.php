<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Post;
use Illuminate\Support\Str;

class PostController extends Controller
{
    function index()
    {
        $posts = Post::where('status', '!=', 0)
            ->where('topic_id',"!=", null)
            ->orderBy('created_at', 'desc')
            ->select('*')
            ->get();
        $total = Post::count();
        $result = [
            'status' => true,
            'posts' => $posts,
            'message' => 'Tai lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    function indexpage()
    {
        $posts = Post::where('status', '!=', 0)
            ->where('topic_id', null)
            ->orderBy('created_at', 'desc')
            ->select('*')
            ->get();
        $total = Post::count();
        $result = [
            'status' => true,
            'posts' => $posts,
            'message' => 'Tai lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    function indexnew()
    {
        $posts = Post::where('status', '!=', 0)
            ->orderBy('created_at', 'desc')
            ->take(4) // Chỉ lấy 4 mẫu tin
            ->get();

        $total = Post::count();
        $result = [
            'status' => true,
            'posts' => $posts,
            'message' => 'Tải liệu thành công',
            'total' => $total
        ];

        return response()->json($result, 200);
    }

    function indextech()
    {
        $posts = Post::where('status', '!=', 0)
            ->where('type', 'congnghe')
            ->orderByDesc('created_at')
            ->take(4)
            ->get();

        $total = Post::where('status', '!=', 0)
            ->where('type', 'congnghe')
            ->count();

        $result = [
            'status' => true,
            'posts' => $posts,
            'message' => 'Tải liệu thành công',
            'total' => $total
        ];

        return response()->json($result, 200);
    }


    function show($id)
    {
        $post = Post::find($id);
        if ($post == null) {
            $result = [
                'status' => false,
                'post' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'post' => $post,
            'message' => 'Tai du lieu thanh cong',
        ];
        return response()->json($result, 200);
    }

    function showBySlug($slug)
    {
        // Tìm bài viết dựa vào slug
        $post = Post::where('slug', $slug)->first();

        if ($post == null) {
            $result = [
                'status' => false,
                'post' => null,
                'message' => 'Không tìm thấy dữ liệu',
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'post' => $post,
            'message' => 'Tải dữ liệu thành công',
        ];

        return response()->json($result, 200);
    }

    function store(Request $request)
    {
        $post = new Post();
        $post->topic_id = $request->topic_id ? $request->topic_id : null; // reactjs
        $post->title = $request->title;
        $post->slug = Str::of($request->title)->slug('-');
        $post->detail = $request->detail;
        $post->description = $request->description;
        // upload file -- reactjs
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/post'), $fileName);
                $post->image = $fileName;
            }
        }
        // end upload
        $post->type = $request->type; // reactjs
        $post->created_at = date('Y-m-d H:i:s');
        $post->created_by = 1; // tam
        $post->status = $request->status; // reactjs
        if ($post->save()) {
            $result = [
                'status' => true,
                'post' => $post,
                'message' => 'Them du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'post' => null,
            'message' => 'Khong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $post = Post::find($id);
        if ($post == null) {
            $result = [
                'status' => false,
                'post' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        $post->topic_id = $request->topic_id; // reactjs
        $post->title = $request->title;
        $post->slug = Str::of($request->name)->slug('-');
        $post->detail = $request->detail;
        $post->description = $request->description;
        // upload file -- reactjs
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/post'), $fileName);
                $post->image = $fileName;
            }
        }
        // end upload
        $post->type = $request->type; //reactjs
        $post->updated_at = date('Y-m-d H:i:s');
        $post->updated_by = $request->updated_by; //tam
        $post->status = $request->status; //reactjs
        if ($post->save()) {
            $result = [
                'status' => true,
                'post' => $post,
                'message' => 'Cap nha du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'post' => null,
            'message' => 'Khoong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    function updatepage(Request $request, $id)
    {
        $post = Post::find($id);
        if ($post == null) {
            $result = [
                'status' => false,
                'post' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $post->title = $request->title;
        $post->slug = Str::of($request->name)->slug('-');
        $post->detail = $request->detail;
        $post->description = $request->description;
        // upload file -- reactjs
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/post'), $fileName);
                $post->image = $fileName;
            }
        }
        // end upload
        $post->type = $request->type; //reactjs
        $post->updated_at = date('Y-m-d H:i:s');
        $post->updated_by = $request->updated_by; //tam
        $post->status = $request->status; //reactjs
        if ($post->save()) {
            $result = [
                'status' => true,
                'post' => $post,
                'message' => 'Cap nha du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'post' => null,
            'message' => 'Khoong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    //api đổi trạng thái của post
    function status($id)
    {
        $post = Post::find($id);
        if ($post == null) {
            $result = [
                'status' => false,
                'post' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $post->status = ($post->status == 1) ? 2 : 1;
        $post->updated_at = date('Y-m-d H:i:s');
        $post->updated_by = 1; //tam
        if ($post->save()) {
            $result = [
                'status' => true,
                'post' => $post,
                'message' => 'Cap nhat du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'post' => null,
            'message' => 'Khong the cap nhat du lieu',
        ];
        return response()->json($result, 200);
    }

    function destroy($id)
    {
        $post = Post::find($id);
        if ($post == null) {
            $result = [
                'status' => false,
                'post' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        if ($post->delete()) {
            $result = [
                'status' => true,
                'post' => $post,
                'message' => 'Cap nha du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'post' => null,
            'message' => 'Khoong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    function trash($id)
    {
        $post = Post::find($id);
        if ($post == null) {
            $result = [
                'status' => false,
                'post' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $post->status = ($post->status == 0) ? 1 : 0;
        $post->updated_at = date('Y-m-d H:i:s');
        $post->updated_by = 1; //tam
        if ($post->save()) {
            $result = [
                'status' => true,
                'post' => $post,
                'message' => 'Cap nhat du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'post' => null,
            'message' => 'Khong the cap nhat du lieu',
        ];
        return response()->json($result, 200);
    }
    function indextrash()
    {
        $posts = Post::where('status', 0)
            ->where('topic_id', "!=", null)
            ->orderBy('created_at', 'desc')
            ->select('*')
            ->get();
        $total = Post::count();
        $result = [
            'status' => true,
            'posts' => $posts,
            'message' => 'Tai lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    function indextrashpage()
    {
        $posts = Post::where('status', 0)
            ->where('topic_id', null)
            ->orderBy('created_at', 'desc')
            ->select('*')
            ->get();
        $total = Post::count();
        $result = [
            'status' => true,
            'posts' => $posts,
            'message' => 'Tai lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
}