<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A matrix test example.
     *
     * @return void
     */
    public function test_page_number_validation()
    {
        print_r("page number validation completed \n");
        $response = $this->get(route('posters.save', 'Matrix'))->dump()
            ->assertStatus(400)
            ->assertJsonStructure([
                'code',
                'status',
                'message',
            ]);
    }

    /**
     * A omdb page number test example.
     *
     * @return void
     */
    public function test_omdb_page_number_validation()
    {
        print_r("omdb page number validation completed \n");
        $this->get(route('posters.save', ['Matrix', 'page' => 1]))->dump()
            ->assertStatus(400)
            ->assertJsonStructure([
                'code',
                'status',
                'message',
            ]);
    }

    /**
     * A page number test example.
     *
     * @return void
     */
    public function test_success_result()
    {
        print_r("success result completed \n");
        $response = $this->get(route('posters.save', ['Matrix', 'page' => 1, 'omdb_page' => 1]))->dump()
            ->assertStatus(200);
    }
}
