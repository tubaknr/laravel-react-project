<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    public function login(LoginRequest $request){
        // LoginRequest class'ından gelen ve doğrulanmış verileri alır. validation
        $credentials = $request->validated();

        // girş denemesi
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email address or password is incorrect.'
            ]);
        }
        
        // giriş denemesi başarılı ise:
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));

    }

    public function signup(SignupRequest $request){
        // SignupRequest class'ından gelen ve doğrulanmış verileri alır.

        $data = $request->validated();

        // kullanıcı oluşturma & veritabanına kaydedilir. şifre hashlenir.
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        // yeni kullanıcıya token oluşturulur
        $token = $user->createToken('main')->plainTextToken;
        
        return response(compact('user', 'token'));
        // return response()->json(['message' => 'Logout çalıştı!']);
    }

    public function logout(Request $request){
        /** @var User $user */

        // giriş yapan kullanıcı
        $user = $request->user();
        
        // aktif token iptal edilir.
        $user->currentAccessToken()->delete();

        // 204 No Content yanıtı döner.
        return response('', 204);
    }
}
