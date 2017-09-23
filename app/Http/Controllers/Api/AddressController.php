<?php

namespace App\Http\Controllers\Api;

use App\Address;
use Illuminate\Http\Request;
use Auth;

class AddressController extends BaseApiController
{
    /**
     * @var Address
     */
    private $address;

    /**
     * AddressController constructor.
     *
     * @param Address $address
     */
    public function __construct(Address $address)
    {
        parent::__construct();

        $this->address = $address;
    }


    /**
     * 地址列表
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function list()
    {
        $addresses = $this->address->where('user_id', $this->currentUser->id)->get();

        return response()->json(compact('addresses'));
    }

    /**
     * 地址详情
     *
     * @param $id
     *
     * @return mixed
     */
    public function show($id)
    {
        $address = $this->address->findOrFail($id);

        return response()->json(compact('address'));
    }

    /**
     * 添加地址
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $data = $request->input('address');
        $id = $request->input('id', null);
        $data['user_id'] = $this->currentUser->id;

        $this->address->updateOrCreate(['id' => $id], $data);

        return response()->json(['info' => '保存成功']);
    }

    /**
     * 更新地址
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Request $request, $id)
    {
        $data = $request->all();

        $data['user_id'] = $this->currentUser->id;

        $this->address->where('id', $id)->update($data);

        return response()->json(['info' => '添加成功']);
    }

    /**
     * 删除地址
     *
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $this->address->where('id', $id)->delete();

        return response()->json(['info' => '删除成功']);
    }
}
