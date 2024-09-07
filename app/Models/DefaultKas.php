<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DefaultKas extends Model
{
    use HasFactory;

    protected $fillable = [
        'default_kas',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
