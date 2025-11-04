<?php

namespace App\Http\Controllers;

use App\Http\Resources\One\UserResource;
use App\Http\Resources\RolesCollection;
use App\Http\Resources\UserCollection;
use App\Models\Roles;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $users = new UserCollection(
            User::paginate(10)
        );

        return inertia('Users/Index', [
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = new RolesCollection(
            Roles::where('is_active', true)->get()
        );

        return inertia('Users/Page', [
            'roles' => $roles->all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role_id' => 'required|exists:roles,id',
        ]);

        try {
            DB::beginTransaction();
            User::create([
                'name' => $request->name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'role_id' => $request->role_id,
            ]);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            $this->logError($th, __CLASS__, __FUNCTION__);
            return back()->withErrors('error', 'Ocurrió un error al crear el usuario: ' . $th->getMessage());
        }

    return redirect()->route('administration.users.index')->with('success', 'Usuario creado con éxito.');
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        
        $user = new UserResource(User::findOrFail($id));

        $roles = new RolesCollection(
            Roles::where('is_active', true)->get()
        );

        return inertia('Users/Page', [
            'user' => $user,
            'roles' => $roles
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8|confirmed',
            'role_id' => 'required|exists:roles,id',
        ]);

        try {
            DB::beginTransaction();
            $user = User::findOrFail($id);
            $user->name = $request->name;
            $user->last_name = $request->last_name;
            $user->email = $request->email;
            if ($request->filled('password')) {
                $user->password = bcrypt($request->password);
            }
            $user->role_id = $request->role_id;
            $user->save();
            DB::commit();

            return redirect()->route('administration.users.index')->with('success', 'Usuario actualizado con éxito.');
        } catch (\Throwable $th) {
            DB::rollBack();
            $this->logError($th, __CLASS__, __FUNCTION__);
            return back()->withErrors('error', 'Ocurrió un error al actualizar el usuario: ' . $th->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            DB::beginTransaction();
            User::find($id)->delete();
            DB::commit();

            return to_route('administration.users.index')->with('success', 'Usuario eliminado con éxito.');
        } catch (\Throwable $th) {
            DB::rollBack();
            $this->logError($th, __CLASS__, __FUNCTION__);
            return back()->withErrors(['error' => 'Ocurrió un error al eliminar el usuario.']);
        }
    }
}
