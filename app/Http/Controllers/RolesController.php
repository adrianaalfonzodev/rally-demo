<?php

namespace App\Http\Controllers;

use App\Http\Resources\RolesCollection;
use App\Models\Roles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RolesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = new RolesCollection(Roles::all());

        return inertia('Roles/Index', [
            'roles' => $roles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $role = null;

        return inertia('Roles/Page', [
            'role' => $role
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'description' => 'nullable|string',
            'is_active' => 'required|boolean',
            'permissions' => 'required|array',
        ]);

        try {

            DB::beginTransaction();
            Roles::create($request->all());
            DB::commit();

            return to_route('administration.roles.index')->with('success', 'Rol creado con éxito.');
        } catch (\Throwable $th) {
            DB::rollBack();
            $this->logError($th, __CLASS__, __FUNCTION__);
            return back()->withErrors(['error' => 'Ocurrió un error al crear el rol.']);
        }
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
        $role = new RolesCollection(Roles::where('id', $id)->get());
        return inertia('Roles/Page', [
            'role' => $role->first()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $id,
            'description' => 'nullable|string',
            'is_active' => 'required|boolean',
            'permissions' => 'nullable|array',
        ]);
        
        try {

            DB::beginTransaction();
            $role = Roles::find($id);
            $role->update($request->all());
            DB::commit();

            return to_route('administration.roles.index')->with('success', 'Rol actualizado con éxito.');
        } catch (\Throwable $th) {
            DB::rollBack();
            $this->logError($th, __CLASS__, __FUNCTION__);
            return back()->withErrors(['error' => 'Ocurrió un error al actualizar el rol.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            DB::beginTransaction();
            Roles::find($id)->delete();
            DB::commit();

            return to_route('administration.roles.index')->with('success', 'Rol eliminado con éxito.');
        } catch (\Throwable $th) {
            DB::rollBack();
            $this->logError($th, __CLASS__, __FUNCTION__);
            return back()->withErrors(['error' => 'Ocurrió un error al eliminar el rol.']);
        }
    }
}
