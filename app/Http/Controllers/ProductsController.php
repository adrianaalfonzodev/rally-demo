<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProdutsCollection;
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Traits\ImagenTrait;


class ProductsController extends Controller
{
    use ImagenTrait;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = new ProdutsCollection(Products::all());
        
        return inertia()->render('Products/Index', [
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $product = null;

        return inertia()->render('Products/Page', [
            'product' => $product
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'sku' => 'required|string|max:255|unique:products,sku',
            'location' => 'nullable|string|max:255',
            'name' => 'required|string|max:255',
            'purchase_description' => 'nullable|string',
            'sales_description' => 'nullable|string',
            'cost' => 'required|numeric|min:0',
            'sale_price' => 'required|numeric|min:0',
            'price_unit' => 'nullable|string|max:100',
            'tax_rate' => 'nullable|numeric|min:0',
            'account_item' => 'nullable|string|max:255',
            'stock_min' => 'nullable|integer|min:0',
            'stock_max' => 'nullable|integer|min:0',
            'reorder_level' => 'nullable|integer|min:0',
            'is_active' => 'required|boolean',
            'extra_data' => 'nullable|array',
            'images' => 'nullable|array',
        ]);

        try {

            DB::beginTransaction();

            if (!empty($request->file('images'))) {
                $uploadedImages = [];
                foreach ($request->file('images') as $image) {
                    $uploadedImages[] = $this->uploadImage($image, 'products');
                }
                $request->merge(['images' => $uploadedImages]);
            }
            $request->merge(['created_by' => Auth::id()]);

            Products::create($request->all());

            DB::commit();

            return to_route('inventory.products.index')->with('success', 'Producto creado con éxito.');
        } catch (\Throwable $th) {
            DB::rollBack();
            $this->logError($th, __CLASS__, __FUNCTION__);
            return back()->withErrors(['error' => 'Ocurrió un error al crear el producto.']);
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
        $product = Products::findOrFail($id);

        return inertia()->render('Products/Page', [
            'product' => $product
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'sku' => 'required|string|max:255|unique:products,sku,' . $id,
            'location' => 'nullable|string|max:255',
            'name' => 'required|string|max:255',
            'purchase_description' => 'nullable|string',
            'sales_description' => 'nullable|string',
            'cost' => 'required|numeric|min:0',
            'sale_price' => 'required|numeric|min:0',
            'price_unit' => 'nullable|string|max:100',
            'tax_rate' => 'nullable|numeric|min:0',
            'account_item' => 'nullable|string|max:255',
            'stock_min' => 'nullable|integer|min:0',
            'stock_max' => 'nullable|integer|min:0',
            'reorder_level' => 'nullable|integer|min:0',
            'is_active' => 'required|boolean',
            'extra_data' => 'nullable|array',
            'images' => 'nullable|array',
        ]);

        try {

            DB::beginTransaction();

            $product = Products::findOrFail($id);

            if (!empty($request->file('images'))) {
                $uploadedImages = [];
                foreach ($request->file('images') as $image) {
                    $uploadedImages[] = $this->uploadImage($image, 'products');
                }
                $request->merge(['images' => $uploadedImages]);
            }

            $product->update($request->all());

            DB::commit();

            return to_route('inventory.products.index')->with('success', 'Producto actualizado con éxito.');
        } catch (\Throwable $th) {
            DB::rollBack();
            $this->logError($th, __CLASS__, __FUNCTION__);
            return back()->withErrors(['error' => 'Ocurrió un error al actualizar el producto.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $product = Products::findOrFail($id);
            $product->delete();

            return to_route('inventory.products.index')->with('success', 'Producto eliminado con éxito.');
        } catch (\Throwable $th) {
            $this->logError($th, __CLASS__, __FUNCTION__);
            return back()->withErrors(['error' => 'Ocurrió un error al eliminar el producto.']);
        }
    }
}
