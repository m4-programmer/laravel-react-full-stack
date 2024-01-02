<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function signup(Request $request){
        $request->validate([
           'name'=>'required|string|max:250',
           'email'=>'required|email|unique:users,email',
           'password'=>'required|string|min:5|confirmed',
        ]);
        /** @var User $user */
        $user = User::create($request->only('name','email') + ['password'=>Hash::make($request->password)]);
        $token = $user->createToken('auth')->plainTextToken;
        $data = [
            'token'=>$token,
            'user'=>$user
        ];
        return response()->json($data, 200);
    }

    public function login(Request $request){
        $data = $request->validate([
            'email'=>'required|email|exists:users,email',
            'password'=>'required|string|min:5|',
        ]);
        /** @var User $user */
        if (!Auth::attempt($data)){
            return response()->json(['message'=>'Invalid email or password'], Response::HTTP_NOT_FOUND);
        }
        $user = Auth::user();
        $token = $user->createToken('auth')->plainTextToken;
        $data = [
            'token'=>$token,
            'user'=>$user
        ];
        return response()->json($data, 200);
    }
    public function logout(Request $request){
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return \response('', 204);
    }
}
