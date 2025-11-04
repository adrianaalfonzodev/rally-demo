<?php

namespace App\Traits;

use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Throwable;



trait LoggerTrait
{
    /**
     * Muestra los errores de las excepciones
     *
     * @param Throwable $th
     * @param string $controller
     * @param string $function
     * @return void
     */
    public function logError(Throwable $th, string $controller, string $function){
        Log::info('******* Error Log Start ******');
        Log::info('Timestamp: ' . Carbon::now());
        Log::info('Controller: ' . $controller);
        Log::info('Function: ' . $function);
        Log::info('Error File: ' . $th->getFile());
        Log::info('Error Line: ' . $th->getLine());
        Log::info('Error Message: ' . $th->getMessage());
        Log::info('Error Code: ' . $th->getCode()); 
        Log::info('Error Trace: ' . $th->getTraceAsString());
        Log::info('******* Error Log End ******');
    }
}
