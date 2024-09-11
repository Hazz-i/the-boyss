<?php

namespace App\Traits;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;

trait CDNRWA
{
    public function uploadRwa(string $destination, UploadedFile $file, string $old_filename = ""): array
    {
        if (!$file)
            return [
                'status' => false
            ];

        $client = new Client();

        try {
            $multipartData = [
                [
                    'name'     => 'file',
                    'contents' => fopen($file->getPathname(), 'r'),
                    'filename' => $file->getClientOriginalName(),
                ],
            ];

            if (!empty($old_filename)) {
                $multipartData[] = [
                    'name'     => 'old_filename',
                    'contents' => $old_filename,
                ];
            }

            $response = $client->post(config('cdn.url') . $destination . '/upload', [
                'multipart' => $multipartData,
                'headers' => [
                    'SECRET-TOKEN' => Hash::make(config('cdn.secret')),
                    'Accept'        => 'application/json',
                ],
            ]);

            if ($response->getStatusCode() == 201) {
                return json_decode($response->getBody()->getContents(), true);
            } else {
                return [
                    'status' => false
                ];
            }
        } catch (RequestException $e) {
            return [
                'status' => false
            ];
        }
    }
}