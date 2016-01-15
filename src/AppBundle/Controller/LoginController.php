<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 04.12.15
 * Time: 14:27
 */

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations\RouteResource;

/**
 * @RouteResource("Login")
 */
class LoginController extends FOSRestController
{
    /**
     * Proxy login
     *
     * @ApiDoc()
     */
    public function postAction(Request $request)
    {
        $data = [
            'username' => $request->request->get('username'),
            'password' => $request->request->get('password'),
        ];

        return $this->proxy('password', $data);
    }

    /**
     * Proxy refresh token
     *
     * @ApiDoc()
     */
    public function postTokenAction(Request $request)
    {
        $encryption = $this->get('encryption');
        $data = [
            'refresh_token' => $encryption->decode($request->request->get('refresh_token')),
        ];

        return $this->proxy('refresh_token', $data);
    }

    private function proxy($grantType, array $data = []) {
        try {
            $config = $this->container;

            $data = array_merge([
                'client_id' => $config->getParameter('client_id'),
                'client_secret' => $config->getParameter('client_secret'),
                'grant_type' => $grantType
            ], $data);

            $client = new Client();
            $urlName = 'fos_oauth_server_token';

            $guzzleResponse = $client->request('POST', $this->generateUrl($urlName, [], true), ['form_params' => $data]);
        } catch (BadResponseException $e) {
            $guzzleResponse = $e->getResponse();
            dump([$this->generateUrl($urlName, [], true), $guzzleResponse, $e]);
        }

        $response = json_decode($guzzleResponse->getBody());

        if (property_exists($response, "access_token")) {
            $encryption = $this->get('encryption');
            $encryptedToken = $encryption->encode($response->refresh_token);

            $response = [
                'access_token' => $response->access_token,
                'expires_in'  => $response->expires_in,
                'refresh_token' => $encryptedToken
            ];
        }

        $view = $this->view($response, $guzzleResponse->getStatusCode());

        $headers = $guzzleResponse->getHeaders();
        foreach($headers as $headerType => $headerValue) {
            $view->setHeader($headerType, $headerValue);
        }

        return $this->handleView($view);
    }
}
