<?php

namespace App\Http\Controllers;

use App\Http\Resources\AgentsCollection;
use App\Models\Invoice;
use App\Models\Agents;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Resources\InvoicesCollection;

class InvoicesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $invoices = new InvoicesCollection(Invoice::with(['user', 'agent'])->get());
        return inertia('Invoices/Index', [
            'invoices' => $invoices,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $invoice = null;
        $agents = new AgentsCollection(Agents::where('is_active', true)->get());

        return inertia('Invoices/Page', [
            'invoice' => $invoice,
            'agents' => $agents,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'agent_id' => 'required|exists:agents,id',
            'number' => 'required|string|unique:invoices,number',
            'date' => 'required|date',
            'time' => 'required',
            'items' => 'required|array',
            'total' => 'required|numeric',
            'rate_bcv' => 'nullable|numeric',
            'advanced_bcv' => 'nullable|numeric',
            'notes' => 'nullable|string',
            'is_delivery_note' => 'nullable|boolean',
            'is_invoice_tax' => 'nullable|boolean',
            'is_tax_taxpayer' => 'nullable|boolean',
        ]);

        try {
            DB::beginTransaction();

            // Create the invoice
            $validatedData['user_id'] = Auth::id();
            $invoice = Invoice::create($validatedData);

            DB::commit();

            return redirect()->route('billing.invoices.index')->with('success', 'Invoice created successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();
            $this->logError($th, __CLASS__, __FUNCTION__);
            return back()->withErrors(['error' => 'An error occurred while creating the invoice.']);
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
        $invoice = Invoice::findOrFail($id);
        $agents = new AgentsCollection(Agents::where('is_active', true)->get());

        return inertia('Invoices/Page', [
            'invoice' => $invoice,
            'agents' => $agents,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'agent_id' => 'required|exists:agents,id',
            'number' => 'required|string|unique:invoices,number,' . $id,
            'date' => 'required|date',
            'time' => 'required',
            'items' => 'required|array',
            'total' => 'required|numeric',
            'rate_bcv' => 'nullable|numeric',
            'advanced_bcv' => 'nullable|numeric',
            'notes' => 'nullable|string',
            'is_delivery_note' => 'nullable|boolean',
            'is_invoice_tax' => 'nullable|boolean',
            'is_tax_taxpayer' => 'nullable|boolean',
        ]);

        try {
            DB::beginTransaction();

            $invoice = Invoice::findOrFail($id);
            $invoice->update($validated);

            DB::commit();

            return redirect()->route('billing.invoices.index')->with('success', 'Invoice updated successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();
            $this->logError($th, __CLASS__, __FUNCTION__);
            return back()->withErrors(['error' => 'An error occurred while updating the invoice.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            DB::beginTransaction();

            $invoice = Invoice::findOrFail($id);
            $invoice->delete();

            DB::commit();

            return redirect()->route('billing.invoices.index')->with('success', 'Invoice deleted successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();
            $this->logError($th, __CLASS__, __FUNCTION__);
            return back()->withErrors(['error' => 'An error occurred while deleting the invoice.']);
        }
    }
}
