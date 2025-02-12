<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class ArrivalsApiService
{
    public function __construct(private HttpClientInterface $client) {}

    public function getArrivals(string $airport, int $begin, int $end): array
    {
        $url = "https://opensky-network.org/api/flights/arrival?airport=$airport&begin=$begin&end=$end"; // We build the URL with the parameters
        $response = $this->client->request('GET', $url); // We make the request to the API      
        $data = [];
        foreach ($response->toArray()  as $key => $row) { // Here in data we select the fields we want to return instead of returning all the data, triming the response at this point slightly improves the performance and makes the answer more readable
            $data[$key]['callsign'] = $row['callsign'];
            $data[$key]['estDepartureAirport'] =  isset($row['estDepartureAirport']) ? $row['estDepartureAirport'] : "Undefined";
            $data[$key]['estDepartureAirportHorizDistance'] = isset($row['estDepartureAirport']) ? $row['estDepartureAirportHorizDistance'] : 0;
        }

        return ['data' => $data, 'code' => $response->getStatusCode()];
    }
}
