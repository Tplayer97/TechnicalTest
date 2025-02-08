<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ArrivalsAPIController extends AbstractController
{
    #[Route('/arrivals', name: 'app_arrivals_a_p_i')]
    public function index(): Response
    {
     
        return $this->render('arrivals_api/index.html.twig', [
            'controller_name' => 'ArrivalsAPIController',
        ]);
    }
}
