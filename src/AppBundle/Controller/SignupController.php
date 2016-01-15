<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use FOS\RestBundle\Controller\FOSRestController;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Validator\Constraints\Callback;
use Symfony\Component\Validator\Constraints\Collection;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Context\ExecutionContextInterface;
use FOS\RestBundle\Controller\Annotations\RouteResource;

/**
 * @RouteResource("Signup")
 */
class SignupController extends FOSRestController
{
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
     */
    public function postTempAction()
    {
        $userManager = $this->container->get('fos_user.user_manager');
        $username = $this->generateRandomString(30);
        while ($userManager->findUserByUsername($username)) {
            $username = $this->generateRandomString(30);
        }
        $password = $this->generateRandomString(30);

        $user = $userManager->createUser();
        $user
            ->setUsername($username)
            ->setPlainPassword($password)
            ->setEmail($username)
            ->setEnabled(true);
        $userManager->updateUser($user);

        $data = ['username' => $username, 'password' => $password];
        $view = $this->view($data, 200);

        return $this->handleView($view);
    }

    /**
     * sign up
     *
     * @ApiDoc()
     */
    public function postAction(Request $request)
    {
        $collectionConstraint = new Collection(array(
            'username' => array(
                new NotBlank(),
                new Email(),
                new Callback(array('methods' => array(
                    array($this, 'checkUserNotRegistered')
                ))),
            ),
            'password'  => array(
                new NotBlank(),
                new Length(['min' => 6, 'max' => 20]),
            ),
        ));

        $errors = $this->container->get('validator')->validateValue($request->request->all(), $collectionConstraint);

        if (count($errors) !== 0) {
            throw new BadRequestHttpException($errors[0]->getPropertyPath() . ': ' . $errors[0]->getMessage());
        }

        $username = $request->request->get('username');
        $password = $request->request->get('password');
        $userManager = $this->container->get('fos_user.user_manager');

        $user = $userManager->createUser();
        $user
            ->setUsername($username)
            ->setPlainPassword($password)
            ->setEmail($username)
            ->setEnabled(true);
        $userManager->updateUser($user);

        $data = [];
        $view = $this->view($data, 200);

        return $this->handleView($view);
    }

    /**
     * Checks that e-mail is not already registered
     *
     * @param $username
     * @param ExecutionContextInterface|\Symfony\Component\Validator\ExecutionContext $context
     */
    public function checkUserNotRegistered($username, ExecutionContextInterface $context)
    {
        $userManager = $this->container->get('fos_user.user_manager');
        $user = $userManager->findUserByUsername($username);
        if ($user instanceof User) {
            $context->addViolation('This email already exists.', [], null);
        }
    }
}
