<?php
/**
 * Created by PhpStorm.
 * User: sergej
 * Date: 26.11.15
 * Time: 9:05
 */

namespace AppBundle\Controller;

use AppBundle\Entity\Project;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * ApiUsersController
 *
 * @Route("/api/projects")
 */
class ApiProjectsController extends Controller
{
    /**
     * create project
     *
     * @ApiDoc()
     *
     * @Route("/")
     * @Method({"POST"})
     */
    public function createAction(Request $request)
    {
        $user = $this->getUser();
        $em = $this->getDoctrine()->getManager();
        $name = $request->request->get('name');
        $type = (int)$request->request->get('type') || 1;

        $headers = [];
        $headers[] = "Authorization: " . $user->getId();
        $url = "core.mobium.pro/";
        $data = ['title' => $name];

        $project = $this->performRequest($url, $data, $headers);

        $temp = new Project();
        $temp->setId($project['id']);
        $temp->setUser($user);
        //$temp->setTitle($name);

        $em->persist($temp);
        $em->flush();

        return new JsonResponse(array('id' => $project['id']));
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
