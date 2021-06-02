<?php
/**
 * Api Repository Class
 *
 */

namespace App\Repositories\Api;

use App\Contracts\Api\ApiInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Input;
use App\Models\Poster;
use App\Models\Movie;
use Illuminate\Support\Facades\Http;
/**
 * Decouples bussiness logic from object storage, manipulation and internal logic over Module entity.
 */
class ApiRepository implements ApiInterface
{
    /**
     * constructor
     *
     */
    public function __construct()
    {
    }
    /**
     * get poster details
     * @param $poster
     * @return view
     */

    public function getposterssave($key, $omdb_page)
    {

        $url = env("MATRIX_API") . "&s=" . $key . "&page=" . $omdb_page;
        $collection = Http::get($url);
        return $this->postersave($collection->body());
    }

    /**
     * get poster url details check already exist and save.
     * @param $posters
     * @return view
     */

    public function postersave($posters)
    {

        try
        {
            $poster_data = json_decode($posters, true);

            if ($poster_data['Response'] != "False")
            {

                foreach ($poster_data['Search'] as $key => $value)
                {

                    $checkmovie = Movie::Where("imdbID", $value['imdbID'])->first();

                    if (!($checkmovie))
                    {
                        $createmovie = new Movie;
                        $createmovie->title = $value['Title'];
                        $createmovie->type = $value['Type'];
                        $createmovie->year = $value['Year'];
                        $createmovie->imdbID = $value['imdbID'];
                        $createmovie->save();
                        if ($value['Poster'] != "N/A" && isset($value['Poster']))
                        {
                            $createposter = new Poster;
                            $createposter['movie_id'] = $createmovie['id'];
                            $createposter['poster'] = $value['Poster'];
                            $createposter->save();
                        }
                    }
                    $movielist = Movie::with('poster')->paginate(10);
                }

                if (!empty($movielist))
                {

                    $response = ['code' => 200, 'status' => true, 'message' => "Data found", 'posters' => $movielist, 'totalResult' => $poster_data['totalResults'], ];
                }
                else
                {
                    $response = ['code' => 400, 'status' => false, 'message' => "Data not found", 'posters' => $movielist, 'totalResult' => 0];
                }
                return response()->json($response);

            }
            else
            {
                $response = ['code' => 400, 'status' => false, 'message' => "Movie not found", 'totalResult' => 0];
                return response()->json($response);
            }

        }
        catch(\Exception $e)
        {

            $response = ['code' => 400, 'status' => false, 'message' => $e->getMessage() , ];
            return response()
                ->json($response);
        }

    }

}

