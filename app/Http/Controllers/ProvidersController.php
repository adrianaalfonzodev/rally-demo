<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\AgentsCollection;
use App\Http\Resources\One\AgentResource;
use App\Models\Agents;

class ProvidersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    
        $agents = Agents::where('is_provider', true)->get();

        $agents = new AgentsCollection($agents);

        return inertia('Providers/Index', [
            'agents' => $agents,
            'title' => 'Listado de Proveedores',
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $agent = null;
        return inertia('Providers/Page', [
            'agent' => $agent,
            'title' => 'Crear Proveedor',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'id_number' => 'required|string|max:100|unique:agents,id_number',
            'email' => 'nullable|email|max:255|unique:agents,email',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string|max:500',
            'is_active' => 'required|boolean',
        ]);

        try {
            DB::beginTransaction();
            $validatedData['is_provider'] = true;
            $validatedData['user_id'] = Auth::id();

            Agents::create($validatedData);

            DB::commit();

            return redirect()->route('administration.providers.index')
                            ->with('success', 'Provider created successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();
            $this->logError($th, __CLASS__, __FUNCTION__);
            return back()->withErrors(['error' => 'An error occurred while creating the provider.']);
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
        $agent = new AgentResource(Agents::findOrFail($id));

        return inertia('Providers/Page', [
            'agent' => $agent,
            'title' => 'Editar Proveedor',
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $agent = Agents::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'id_number' => 'required|string|max:100|unique:agents,id_number,' . $agent->id,
            'email' => 'nullable|email|max:255|unique:agents,email,' . $agent->id,
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string|max:500',
            'is_active' => 'required|boolean',
        ]);

        
        try {
            DB::beginTransaction();
            $agent->update($validatedData);

            DB::commit();

            return redirect()->route('administration.providers.index')
                            ->with('success', 'Provider updated successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();
            $this->logError($th, __CLASS__, __FUNCTION__);
            return back()->withErrors(['error' => 'An error occurred while updating the provider.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            DB::beginTransaction();
            $agent = Agents::findOrFail($id);
            $agent->delete();

            DB::commit();

            return redirect()->route('administration.providers.index')
                            ->with('success', 'Provider deleted successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();
            $this->logError($th, __CLASS__, __FUNCTION__);
            return back()->withErrors(['error' => 'An error occurred while deleting the provider.']);
        }
    }
}
