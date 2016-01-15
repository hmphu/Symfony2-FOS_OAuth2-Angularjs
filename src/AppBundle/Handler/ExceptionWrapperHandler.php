<?php

namespace AppBundle\Handler;

use FOS\RestBundle\View\ExceptionWrapperHandlerInterface;

class ExceptionWrapperHandler implements ExceptionWrapperHandlerInterface
{
    /**
     * {@inheritdoc}
     */
    public function wrap($data)
    {
        $exception = $data['exception'];

        return [
            'code' => $data['status_code'],
            'message' => $exception->getMessage()
        ];
    }
}