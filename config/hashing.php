<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Hashing Driver
    |--------------------------------------------------------------------------
    |
    | This option controls the default hashing driver that will be used to
    | hash passwords for your application. By default, the bcrypt algorithm
    | is used; however, you remain free to modify this option if you wish.
    |
    | Supported: "bcrypt", "argon", "argon2id"
    |
    */

    'driver' => 'bcrypt',

    /*
    |--------------------------------------------------------------------------
    | Bcrypt Options
    |--------------------------------------------------------------------------
    |
    | Here you may specify the configuration options that should be used
    | when passwords are hashed using the Bcrypt algorithm. This will
    | allow you to control the amount of time it takes to hash the given
    | password. You may adjust these values as needed.
    |
    */

    'bcrypt' => [
        'rounds' => env('BCRYPT_ROUNDS', 10),
    ],

    /*
    |--------------------------------------------------------------------------
    | Argon Options
    |--------------------------------------------------------------------------
    |
    | Here you may specify the configuration options that should be used
    | when passwords are hashed using the Argon algorithm. These will
    | allow you to control the amount of time it takes to hash the given
    | password as well as the memory and threads used by the algorithm.
    |
    */

    'argon' => [
        'memory' => 65536,
        'threads' => 1,
        'time' => 4,
    ],

];
