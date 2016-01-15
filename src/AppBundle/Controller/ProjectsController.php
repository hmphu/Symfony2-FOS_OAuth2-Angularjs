<?php
/**
 * Created by PhpStorm.
 * User: sergej
 * Date: 26.11.15
 * Time: 9:05
 */

namespace AppBundle\Controller;

use AppBundle\Entity\Project;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use FOS\RestBundle\Controller\Annotations\RouteResource;

/**
 * @RouteResource("Projects")
 */
class ProjectsController extends FOSRestController
{
    /**
     * create project
     *
     * @ApiDoc()
     */
    public function postAction(Request $request)
    {
        /*$user = $this->getUser();
        $em = $this->getDoctrine()->getManager();
        $title = $request->request->get('title');
        $type = (int)$request->request->get('type') || 1;

        $headers = [];
        $headers[] = "Authorization: " . $user->getId();
        $url = "core.mobium.pro/";
        $data = ['title' => $title];

        $project = $this->performRequest($url, $data, $headers);

        $temp = new Project();
        $temp->setId($project['id']);
        $temp->setUser($user);
        //$temp->setTitle($title);

        $em->persist($temp);
        $em->flush();*/

        $data = ['id' => 1];
        $view = $this->view($data, 200);

        return $this->handleView($view);
    }

    private function performRequest($url, $data, $headers, $type = "POST") {
        $ch = curl_init();

        if ($type == "GET") {
            $url .= "?" . http_build_query($data);
        }
        curl_setopt($ch, CURLOPT_URL, $url);

        if ($type == "POST") {
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        }

        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $output = curl_exec ($ch);
        curl_close ($ch);

        return $output;
    }

}
