/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'

const iceType = ['正常冰', '少冰', '微冰', '去冰', '熱']
const sugarType = ['全糖', '七分', '半糖', '三分', '無糖']
const toppingsType = ['珍珠', '粉條', '小粉圓', '椰果', '芋頭']
const products = [
  {
    name: '珍珠鮮奶茶',
    engName: 'Pearl Milk Tea',
    price: 60,
    defaults: {
      toppings: ['珍珠'],
      sugar: '',
      ice: ''
    }
  },
  {
    name: '椰果鮮奶茶',
    engName: 'Coconut Milk Tea',
    price: 60,
    defaults: {
      toppings: ['椰果'],
      sugar: '',
      ice: ''
    }
  },
  {
    name: '鮮奶茶',
    engName: 'Milk Tea',
    price: 50,
    defaults: {
      toppings: [''],
      sugar: '',
      ice: ''
    }
  },
  {
    name: '古意冬瓜茶 (糖固定)',
    engName: 'Winter Melon Drink',
    price: 30,
    defaults: {
      toppings: [''],
      sugar: '全糖',
      ice: ''
    }
  },
  {
    name: '蜜香紅茶',
    engName: 'Black Tea',
    price: 30,
    defaults: {
      toppings: [''],
      sugar: '',
      ice: ''
    }
  },
  {
    name: '包種青茶',
    engName: 'Black Tea',
    price: 35,
    defaults: {
      toppings: [''],
      sugar: '',
      ice: ''
    }
  },
  {
    name: '檸檬烏龍',
    engName: 'Lemon Oolong Tea',
    price: 55,
    defaults: {
      toppings: [''],
      sugar: '',
      ice: ''
    }
  },
  {
    name: '薑母茶 (熱飲)',
    engName: 'Ginger Tea',
    price: 55,
    defaults: {
      toppings: [''],
      sugar: '',
      ice: '熱'
    }
  },
  {
    name: '青草茶',
    engName: 'Herbal Tea',
    price: 35,
    defaults: {
      toppings: [''],
      sugar: '',
      ice: ''
    }
  },
  {
    name: '金桔檸檬',
    engName: 'Kumquat Lemonade',
    price: 40,
    defaults: {
      toppings: [''],
      sugar: '',
      ice: ''
    }
  },
  {
    name: '柳澄青茶',
    engName: 'Orange Mountain Tea',
    price: 45,
    defaults: {
      toppings: [''],
      sugar: '',
      ice: ''
    }
  }
]

export default function App() {
  const [dataItem, setDataItem] = useState({})
  const [dataList, setDataList] = useState([])
  const [orderInfo, setOrderInfo] = useState({ list: [], time: null })

  return (
    <div className={'App'}>
      <Container className={'bg-light mb-3'}>
        <div className={'row py-3 px-1'}>
          <ProductMenu
            // param
            dataItem={dataItem}
            setDataItem={setDataItem}
            dataList={dataList}
          />

          <div className={'col-md-8'}>
            <OrderDrinkItem
              dataItem={dataItem}
              setDataItem={setDataItem}
              dataList={dataList}
              setDataList={setDataList}
            />

            <OrderDrinkList
              dataItem={dataItem}
              setDataItem={setDataItem}
              dataList={dataList}
              setOrderInfo={setOrderInfo}
            />
          </div>
        </div>

        <OrderResult orderInfo={orderInfo} />
      </Container>
    </div>
  )
}

function ProductMenu({
  // param
  dataItem = {},
  setDataItem = () => undefined,
  dataList = []
}) {
  const isActive = (item) => {
    // name is equal with product
    const isTragetProduct = item?.name === dataItem?.name
    // uuid is exist in dataList
    const isExist = dataList.some((item) => item?.uuid === dataItem?.uuid)

    return isTragetProduct && !isExist
  }

  const handleSelectProduct = (item) => {
    setDataItem({
      // first, basic info (name, price)
      ...item,

      // second, with timestamp
      uuid: new Date().getTime(),

      // third, other dafault values
      productNum: 1,
      ice: item?.defaults?.ice || iceType[0],
      sugar: item?.defaults?.sugar || sugarType[0],
      toppings: item?.defaults?.toppings || [],
      productNotice: ''
    })
  }

  return (
    <div className={'col-md-4'}>
      <div className={'list-group'}>
        {products.map((item, index) => (
          <a
            key={index}
            href={'#'}
            className={`list-group-item list-group-item-action ${isActive(item) ? 'active' : ''}`}
            onClick={(event) => {
              event.preventDefault()
              handleSelectProduct(item)
            }}
          >
            <h6 className={'card-title mb-1'}>{item.name}</h6>
            <div className={'d-flex align-items-center justify-content-between'}>
              <p className={'mb-0'}>
                <small>{item.engName}</small>
              </p>
              <p className={'mb-0'}>
                <small>{`NT$ ${item.price}`}</small>
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

function OrderDrinkItem({
  // param
  dataItem = {},
  setDataItem = () => undefined,
  dataList = [],
  setDataList = () => undefined
}) {
  const isExist = () => {
    return dataList.some((item) => item?.uuid === dataItem?.uuid)
  }

  return (
    <div className={'card mb-2 position-relative'}>
      {/* if is empty name, show hint mask */}
      {!dataItem?.name && (
        <div
          className={'position-absolute text-white d-flex align-items-center justify-content-center'}
          style={{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            zIndex: 100
          }}
        >
          {'請先選擇飲品'}
        </div>
      )}

      <div className={'card-body px-4'}>
        {/* productNum */}
        <div className={'mb-3'}>
          <label className={'form-label'}>{'數量'}</label>
          <input
            type={'number'}
            className={'form-control'}
            placeholder={'數量'}
            min={'1'}
            value={dataItem?.productNum || 0}
            onChange={(event) => setDataItem((prev) => ({ ...prev, productNum: parseInt(event.target.value, 10) }))}
          />
        </div>

        {/* ice */}
        <div className={'mb-3'}>
          <label className={'form-label d-block'}>{'冰塊*'}</label>
          {iceType.map((item, index) => (
            <div key={index} className={'form-check form-check-inline'}>
              <input
                className={'form-check-input'}
                name={'iceType'}
                type={'radio'}
                id={item}
                value={item}
                checked={dataItem?.ice === item}
                disabled={dataItem?.defaults?.ice}
                onChange={() => setDataItem((prev) => ({ ...prev, ice: item }))}
              />
              <label className={'form-check-label'} htmlFor={item}>
                {item}
              </label>
            </div>
          ))}
        </div>

        {/* sugar */}
        <div className={'mb-3'}>
          <label className={'form-label d-block'}>{'甜度*'}</label>
          {sugarType.map((item, index) => (
            <div key={index} className={'form-check form-check-inline'}>
              <input
                className={'form-check-input'}
                name={'sugarType'}
                type={'radio'}
                id={item}
                value={item}
                checked={dataItem?.sugar === item}
                disabled={dataItem?.defaults?.sugar}
                onChange={() => setDataItem((prev) => ({ ...prev, sugar: item }))}
              />
              <label className={'form-check-label'} htmlFor={item}>
                {item}
              </label>
            </div>
          ))}
        </div>

        {/* toppings */}
        <div className={'mb-3'}>
          <label className={'form-label d-block'}>{'加料'}</label>
          {toppingsType.map((item, index) => (
            <div key={index} className={'form-check form-check-inline'}>
              <input
                className={'form-check-input'}
                name={'toppingsType'}
                type={'checkbox'}
                id={item}
                value={item}
                checked={(dataItem?.toppings || []).includes(item)}
                disabled={(dataItem?.defaults?.toppings || []).includes(item)}
                onChange={() =>
                  setDataItem((prev) => {
                    // prev toppings
                    const prevList = prev?.toppings || []

                    return {
                      ...prev,
                      toppings: prevList.includes(item) ? prevList.filter((x) => x !== item) : [...prevList, item]
                    }
                  })
                }
              />
              <label className={'form-check-label'} htmlFor={item}>
                {item}
              </label>
            </div>
          ))}
        </div>

        {/* productNotice */}
        <div className={'mb-3'}>
          <label className={'form-label'}>{'備註'}</label>
          <textarea
            className={'form-control'}
            id={'productNotice'}
            rows={'2'}
            value={dataItem?.productNotice || ''}
            onChange={(event) => setDataItem((prev) => ({ ...prev, productNotice: event.target.value }))}
          />
        </div>

        {/* button */}
        <div className={'d-flex gap-2'}>
          {/* delete, cancel */}
          <button
            className={'btn btn-outline-primary w-100'}
            type={'button'}
            onClick={() => {
              setDataList((prev) => prev.filter((x) => x.uuid !== dataItem?.uuid))
              setDataItem({})
            }}
          >
            {isExist() ? '刪除' : '取消'}
          </button>

          {/* update, new */}
          <button
            className={'btn btn-primary w-100'}
            type={'button'}
            onClick={() => {
              setDataList((prev) => [...prev.filter((x) => x.uuid !== dataItem?.uuid), dataItem])
              setDataItem({})
            }}
          >
            {isExist() ? '更新' : '加入'}
          </button>
        </div>
      </div>
    </div>
  )
}

function OrderDrinkList({
  // param
  dataItem = {},
  setDataItem = () => undefined,
  dataList = [],
  setOrderInfo = () => undefined
}) {
  const isActive = (item) => {
    // uuid is exist in dataList
    const isExist = dataItem?.uuid === item?.uuid
    return isExist
  }

  const handleCalculateSum = (list) => {
    return list.reduce((prev, curr) => prev + (curr?.price || 0) * (curr?.productNum || 0), 0)
  }

  return (
    <div className={'card'}>
      <div className={'card-body'}>
        <table className={'table'}>
          <thead>
            <tr>
              <th scope={'col'}>{'品項'}</th>
              <th scope={'col'}>{'冰塊'}</th>
              <th scope={'col'}>{'甜度'}</th>
              <th scope={'col'}>{'加料'}</th>
              <th scope={'col'}>{'單價'}</th>
              <th scope={'col'}>{'數量'}</th>
              <th scope={'col'}>{'小計'}</th>
            </tr>
          </thead>
          <tbody>
            {!dataList?.length ? (
              <tr>
                <td colSpan={'7'} className="text-center">
                  {'購物車空空如也!'}
                </td>
              </tr>
            ) : (
              dataList.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => setDataItem(item)}
                  className={`list-group-item list-group-item-action ${isActive(item) ? 'active' : ''}`}
                  style={{ cursor: 'pointer', display: 'table-row', borderLeft: 'inherit', borderRight: 'inherit' }}
                >
                  <th scope={'row'}>
                    <label>{item?.name}</label>
                    <br />
                    {item?.productNotice && (
                      <small className={'text-muted fw-normal'}>{`備註：${item?.productNotice}`}</small>
                    )}
                  </th>
                  <td>{item?.ice}</td>
                  <td>{item?.sugar}</td>
                  <td>{(item?.toppings || []).join(', ') || '-'}</td>
                  <td>{item?.price}</td>
                  <td>{item?.productNum}</td>
                  <td className={'text-end'}>{(item?.price || 0) * (item?.productNum || 0)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <p className={'text-end'}>{`共 NT$ ${handleCalculateSum(dataList)} 元`}</p>
        <button
          className={'btn btn-sm btn-secondary w-100'}
          onClick={() => setOrderInfo({ list: dataList, time: new Date().toLocaleString() })}
          disabled={dataList.length === 0}
        >
          {'產生訂單'}
        </button>
      </div>
    </div>
  )
}

function OrderResult({
  // param
  orderInfo = {}
}) {
  const handleCalculateCaps = (list) => {
    return list.reduce((prev, curr) => prev + (curr?.productNum || 0), 0)
  }

  const handleCalculateSum = (list) => {
    return list.reduce((prev, curr) => prev + (curr?.price || 0) * (curr?.productNum || 0), 0)
  }

  return (
    <div className={'row py-3 px-1'} style={!orderInfo?.list?.length ? { display: 'none' } : {}}>
      <div className={'col-md-12'}>
        <div className={'card p-3'} style={{ minHeight: '450px' }}>
          <table className={'table'}>
            <thead>
              <tr>
                <th scope={'col'}>{'品項'}</th>
                <th scope={'col'}>{'冰塊'}</th>
                <th scope={'col'}>{'甜度'}</th>
                <th scope={'col'}>{'加料'}</th>
                <th scope={'col'}>{'單價'}</th>
                <th scope={'col'}>{'數量'}</th>
                <th scope={'col'}>{'小計'}</th>
              </tr>
            </thead>
            <tbody>
              {orderInfo?.list?.map((item, index) => (
                <tr key={index}>
                  <th scope={'row'}>
                    <label>{item?.name}</label>
                    <br />
                    {item?.productNotice && (
                      <small className={'text-muted fw-normal'}>{`備註：${item?.productNotice}`}</small>
                    )}
                  </th>
                  <td>{item?.ice}</td>
                  <td>{item?.sugar}</td>
                  <td>{(item?.toppings || []).join(', ') || '-'}</td>
                  <td>{item?.price}</td>
                  <td>{item?.productNum}</td>
                  <td className={'text-end'}>{(item?.price || 0) * (item?.productNum || 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={'mt-3 mb-1'}>{`訂單成立時間：${orderInfo?.time || ''}`}</p>
          <p className={'mb-1'}>
            <span>{`餐點數量：${orderInfo?.list?.length} 筆 `}</span>
            <span>{`(${handleCalculateCaps(orderInfo?.list)} 杯)`}</span>
          </p>
          <p className={'mb-1'}>{'付款狀態：未付款'}</p>
          <p className={'text-end mt-auto'}>{`共 NT$ ${handleCalculateSum(orderInfo?.list)} 元`}</p>
        </div>
      </div>
    </div>
  )
}
