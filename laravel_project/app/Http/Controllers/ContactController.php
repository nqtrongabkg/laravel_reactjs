<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
use Illuminate\Support\Str;

class ContactController extends Controller
{
    function index()
    {
        $contacts = Contact::where('status', '!=', 0)
        ->orderBy('created_at', 'desc')
        ->select('*')
        ->get();
        $total = Contact::count();
        $result = [
            'status' => true,
            'conntacts' => $contacts,
            'message' => 'Tai lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    function indextrash()
    {
        $contacts = Contact::where('status', 0)
        ->orderBy('created_at', 'desc')
        ->select('*')
        ->get();
        $total = Contact::count();
        $result = [
            'status' => true,
            'conntacts' => $contacts,
            'message' => 'Tai lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    function show($id)
    {
        $contact = Contact::find($id);
        if ($contact == null) {
            $result = [
                'status' => false,
                'contact' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'contact' => $contact,
            'message' => 'Tai du lieu thanh cong',
        ];
        return response()->json($result, 200);
    }

    function store(Request $request)
    {
        $contact = new Contact();
        $contact->name = $request->name; // reactjs
        $contact->user_id = $request->id ? $request->id : 0; 
        $contact->email = $request->email; // reactjs
        $contact->phone = $request->phone; // reactjs
        $contact->title = $request->title; // reactjs
        $contact->content = $request->content; // reactjs
        $contact->replay_id = 1; // tam
        $contact->created_at = date('Y-m-d H:i:s');
        $contact->created_by = 1; // tam
        $contact->status = $request->status; // reactjs
        if ($contact->save()) {
            $result = [
                'status' => true,
                'contact' => $contact,
                'message' => 'Liên hệ thành công',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'contact' => null,
            'message' => 'Khong the them du lieu',
        ];
        return response()->json($result, 200);
    }
    function replay(Request $request)
    {
        $contact = new Contact();
        $contact->name = $request->name; // reactjs
        $contact->user_id = $request->id ? $request->id : 1;
        $contact->email = $request->email; // reactjs
        $contact->phone = $request->phone; // reactjs
        $contact->title = $request->title; // reactjs
        $contact->content = $request->content; // reactjs
        $contact->replay_id = $request->replay_id; // tam
        $contact->created_at = date('Y-m-d H:i:s');
        $contact->created_by = 1; // tam
        $contact->status = $request->status; // reactjs
        if ($contact->save()) {
            $result = [
                'status' => true,
                'contact' => $contact,
                'message' => 'Liên hệ thành công',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'contact' => null,
            'message' => 'Khong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $contact = Contact::find($id);
        if ($contact == null) {
            $result = [
                'status' => false,
                'contact' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $contact->name = $request->name; // reactjs
        $contact->user_id = 1; // tam
        $contact->email = $request->email; // reactjs
        $contact->phone = $request->phone; // reactjs
        $contact->title = $request->title; // reactjs
        $contact->content = $request->content; // reactjs
        $contact->replay_id = 1; // tam
        $contact->updated_at = date('Y-m-d H:i:s');
        $contact->updated_by = 1; // tam
        $contact->status = $request->status; // reactjs
        if ($contact->save()) {
            $result = [
                'status' => true,
                'contact' => $contact,
                'message' => 'Cap nha du lieu thanh cong',
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

    function destroy($id)
    {
        $contact = Contact::find($id);
        if ($contact == null) {
            $result = [
                'status' => false,
                'contact' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        if ($contact->delete()) {
            $result = [
                'status' => true,
                'contact' => $contact,
                'message' => 'Xoa du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'contact' => null,
            'message' => 'Khong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    function status($id)
    {
        $conntact = Contact::find($id);
        if ($conntact == null) {
            $result = [
                'status' => false,
                'conntact' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $conntact->status = ($conntact->status == 1) ? 2 : 1;
        $conntact->updated_at = date('Y-m-d H:i:s');
        $conntact->updated_by = 1;
        if ($conntact->save()) {
            $result = [
                'status' => true,
                'conntact' => $conntact,
                'message' => 'Cap nhat du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'conntact' => null,
            'message' => 'Khong the cap nhat du lieu',
        ];
        return response()->json($result, 200);
    }
    function trash($id)
    {
        $conntact = Contact::find($id);
        if ($conntact == null) {
            $result = [
                'status' => false,
                'conntact' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $conntact->status = ($conntact->status == 0) ? 1 : 0;
        $conntact->updated_at = date('Y-m-d H:i:s');
        $conntact->updated_by = 1;
        if ($conntact->save()) {
            $result = [
                'status' => true,
                'conntact' => $conntact,
                'message' => 'Cap nhat du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'conntact' => null,
            'message' => 'Khong the cap nhat du lieu',
        ];
        return response()->json($result, 200);
    }
}