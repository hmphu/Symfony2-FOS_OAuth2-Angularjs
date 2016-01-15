<?php

namespace AppBundle\Entity;

use FOS\OAuthServerBundle\Entity\Client as BaseClient;

/**
 * Client
 */
class Client extends BaseClient
{
    /**
     * @var integer
     */
    protected $id;


    public function __construct()
    {
        parent::__construct();
    }
}

