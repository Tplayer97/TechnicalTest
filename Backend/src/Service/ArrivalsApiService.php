<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class ArrivalsApiService
{
    public function __construct(private HttpClientInterface $client)
    {
    }

    public function getArrivals(string $airport, int $begin, int $end): array
    {
        // in theory frontend should validate the input, but we can add some basic validation here
        if (empty($airport)) {
            throw new \Exception('Airport code is required');
        }
        if ($begin === '' || $end === '') {
            throw new \Exception('Error with the time');
        }

        $url = "https://opensky-network.org/api/flights/arrival?airport=$airport&begin=$begin&end=$end"; // We build the URL with the parameters
        
        $response = $this->client->request('GET', $url); // We make the request to the API
       
        switch ($response->getStatusCode()) {
            case 200:// If the status code is 200, we return the data
                $data = $response->toArray();
                break;
            case 404:// According to the API documentation, the API returns a 404 status code when there is no data available, so we return an empty array and we will display a message in the frontend
                $data = [];
                break;
            default: // If the status code is different from 200 or 404, we throw an exception informing that there was an error fetching the data
                throw new \Exception('Error fetching information from the API');
        }
        return $data; 
    }
}
