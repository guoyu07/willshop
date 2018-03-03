<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Favourite
 *
 * @property-read \App\Product $product
 * @property-read \App\User $user
 * @mixin \Eloquent
 * @property int $user_id 用户ID
 * @property int $product_id 产品ID
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Favourite whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Favourite whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Favourite whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Favourite whereUserId($value)
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\Favourite onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Query\Builder|\App\Favourite withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Favourite withoutTrashed()
 * @property string|null $deleted_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Favourite whereDeletedAt($value)
 */
class Favourite extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'product_id',
    ];

    /**
     * 所属用户
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * 商品
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function product()
    {
        return $this->hasOne(Product::class, 'id', 'product_id');
    }
}
