<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Api\ApiRepository;

class ApiController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(ApiRepository $apiRepository)
    {

        $this->apiRepository = $apiRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function getposterssave(Request $request, $key)
    {
        if (!$key) {
            $response = [
                'code'  => 400,
                'status'    => false,
                'message'    => "Require type",
            ];
            return response()->json($response,400);
        } else {
            $omdb_page = $request->query('omdb_page');
            $page = $request->query('page');
            if (!$omdb_page || !$page) {
                if (!$page) {
                    $response = [
                        'code'  => 400,
                        'status'    => false,
                        'message'    => "Require page number",
                    ];
                    return response()->json($response,400);
                }
                if (!$omdb_page) {
                    $response = [
                        'code'  => 400,
                        'status'    => false,
                        'message'    => "Require omdb page number",
                    ];
                    return response()->json($response,400);
                }
            } else {
                return $this->apiRepository->getposterssave($key, $omdb_page);
            }
        }
    }
}
