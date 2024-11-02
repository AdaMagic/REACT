import { Breadcrumb, Button, Card, Form, Input, message, Radio, Select, Upload } from "antd"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import './index.scss'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from "react";
import { createArticleAPI, getArticleByIdAPI, updateArticleAPI } from "@/apis/article";
import { PlusOutlined } from '@ant-design/icons'
import { useChannel } from "@/hooks/useChannel";
import { type } from "@testing-library/user-event/dist/type";
const { Option } = Select
const Publish = () => {
    // 获取下拉框数据
    const { channelList } = useChannel()
    const navigate = useNavigate()

    // 提交表单
    const onFinish = (formValue) => {
        console.log('Success:', formValue);
        const { title, content, channel_id } = formValue
        if (imageList.length !== imageType) {
            return message.warning('封面类型和图片数量不匹配')
        }
        //接口参数
        const reqData = {
            title,
            content,
            cover: {
                type: imageType,
                images: imageList.map(item => {
                    if (item.response) {
                        return item.response.data.url
                    } else {
                        return item.url
                    }
                })
            },
            channel_id
        }
        // 更新文章
        if (articleId) {
            updateArticleAPI({ ...reqData, id: articleId })
            navigate('/article')
        } else {
            createArticleAPI(reqData)
            navigate('/article')
        }
    }

    // 上传图片回调
    const [imageList, setImageList] = useState([])
    const onChange = (value) => {
        console.log('正在上传中', value)
        setImageList(value.fileList)
    }

    // 切换图片封面类型
    const [imageType, setImageType] = useState(0)
    const onTypeChange = (e) => {
        console.log('切换封面了', e.target.value)
        setImageType(e.target.value)
    }



    // 回显数据
    const [searchParams] = useSearchParams()
    const articleId = searchParams.get('id')
    // 获取实例
    const [form] = Form.useForm()
    useEffect(() => {
        // 通过id获取文章详情
        async function getArticleDetail() {
            const res = await getArticleByIdAPI(articleId)
            console.log('文章详情', res);

            // Form组件实例方法：setFieldsValue 回显数据
            form.setFieldsValue({
                ...res.data.data,
                type: res.data.data.cover.type
            })
            // 回显封面图片列表
            setImageType(res.data.data.cover.type)
            // 显示图片({url:url})
            setImageList(res.data.data.cover.images.map(url => {
                return { url }
            }))

        }
        if (articleId) {
            getArticleDetail()
        }


    }, [articleId, form])
    return <div>
        <Card title={<Breadcrumb items={
            [
                { title: <Link to={'/'}>首页</Link> },
                { title: `${articleId ? '编辑' : '发布'}文章` }
            ]
        } />}>
            <Form labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ type: 0 }}
                onFinish={onFinish}
                form={form}>
                <Form.Item label="标题"
                    name="title"
                    rules={[{ required: true, message: '请输入文章标题' }]}>
                    <Input placeholder="请输入文章标题" style={{ with: 400 }}></Input>
                </Form.Item>
                <Form.Item label="频道"
                    name="channel_id"
                    rules={[{ required: true, message: '请选择文章频道' }]}>
                    <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                        {/* value属性用户选中之后会自动收集起来作为接口的提交字段 */}
                        {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label='封面'>
                    <Form.Item name='type'>
                        <Radio.Group onChange={onTypeChange}>
                            <Radio value={1}>单图</Radio>
                            <Radio value={3}>三图</Radio>
                            <Radio value={0}>无图</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {/* listType: 决定选择文件框的外观样式
                        showUploadList: 控制显示上传列表    */}
                    {imageType > 0 && <Upload listType="picture-card"
                        showUploadList
                        action={'http://geek.itheima.net/v1_0/upload'}
                        name='image'
                        onChange={onChange}
                        fileList={imageList}
                        maxCount={imageType}
                    >
                        <div style={{ marginTop: 8 }}>
                            <PlusOutlined />
                        </div>
                    </Upload>}
                </Form.Item>
                <Form.Item
                    label="内容"
                    name="content"
                    rules={[{ required: true, message: '请输入文章内容' }]}
                >
                    {/* 富文本编辑器 */}
                    <ReactQuill theme="snow" className="publish-quill" placeholder="请输入文章内容"></ReactQuill>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4 }}>
                    <Button size="large" type="primary" htmlType="submit">
                        发布文章
                    </Button>

                </Form.Item>
            </Form>
        </Card>
    </div >
}
export default Publish