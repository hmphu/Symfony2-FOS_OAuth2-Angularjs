<?php

namespace AppBundle\Controller;

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
 * @Route("/users")
 */
class ApiUserController extends Controller
{
    /**
     * login
     *
     * @ApiDoc()
     *
     * @Route("/login")
     * @Method({"POST"})
     */
    public function loginAction(Request $request)
    {
        $username = $request->request->get('username');
        $userManager = $this->container->get('fos_user.user_manager');
        $user = $userManager->findUserByUsername($username);
        if (is_null($user)) {
            throw new HttpException(400, "Error User Not Found");
        }
        return new JsonResponse(array('id' => $user->getId(), 'salt' => $user->getSalt()));
    }

    private function generateRandomString($length = 10, $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
    {
        $str = '';
        $max = mb_strlen($keyspace, '8bit') - 1;
        for ($i = 0; $i < $length; ++$i) {
            $str .= $keyspace[mt_rand(0, $max)];
        }
        return $str;
    }

    /**
     * sign up with no registration
     *
     * @ApiDoc()
     *
     * @Route("/signup/temp")
     * @Method({"POST"})
     */
    public function signupTempAction(Request $request)
    {
        $username = $this->generateRandomString(30);
        $password = $this->generateRandomString(30);

        $userManager = $this->container->get('fos_user.user_manager');
        $user = $userManager->createUser();
        $user
            ->setUsername($username)
            ->setPlainPassword($password)
            ->setEmail($username)
            ->setEnabled(true);
        $userManager->updateUser($user);

        return new JsonResponse(array('username' => $username, 'password' => $password));
    }

    /**
     * sign up
     *
     * @ApiDoc()
     *
     * @Route("/signup")
     * @Method({"POST"})
     */
    public function signupAction(Request $request)
    {
        $username = $request->request->get('username');
        $password = $request->request->get('password');
        $userManager = $this->container->get('fos_user.user_manager');

        $check = $userManager->findUserByUsername($username);
        if (!is_null($check)) {
            throw new HttpException(406, "Error: user already exists");
        }

        $user = $userManager->createUser();
        $user
            ->setUsername($username)
            ->setPlainPassword($password)
            ->setEmail($username)
            ->setEnabled(true);
        $userManager->updateUser($user);

        return new JsonResponse(array('success' => true));
    }



}
