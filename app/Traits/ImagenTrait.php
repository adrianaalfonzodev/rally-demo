<?php

namespace App\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;


trait ImagenTrait
{
    /**
     * Upload an image to the specified path.
     *
     * @param UploadedFile $image
     * @param string $path
     * @return string
     */
    public function uploadImage(UploadedFile $image, $path = 'images')
    {
        $name = time().'_'.$image->getClientOriginalName();
        $imagePath = $image->storeAs($path, $name, 'public');
        return $imagePath;
    }
}
