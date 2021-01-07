import React, { useEffect } from 'react';
import {
  Alert,
  Button,
  Comment,
  Form,
  Input,
  List,
  Modal,
  Tooltip,
} from 'antd';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import {
  getHoleList,
  getReplyList,
  getStoken,
  setStoken,
  submitHole,
  unExpandReply,
} from './home_redux';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();

  let { holeList, replyList } = useSelector((state) => state.home);
  let { stoken } = useSelector((state) => state.user);
  let [form] = useForm();
  useEffect(() => {
    dispatch(getHoleList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stoken]);

  const onGetStoken = () => {
    dispatch(getStoken());
  };

  const onStokenSubmit = (e) => {
    console.log(e);
    dispatch(setStoken(e.stoken));
    axios.defaults.headers['stoken'] = e.stoken;
    localStorage.setItem('stoken', e.stoken);
  };

  const onReplySubmit = (e) => {
    console.log(e);
    dispatch(submitHole(e));
  };

  const onPostSubmit = (e) => {
    console.log(e);
    dispatch(submitHole(e));
  };

  const expandReply = (holeId) => {
    dispatch(getReplyList(holeId));
  };
  const onUnExpandReply = (holeId) => {
    dispatch(unExpandReply(holeId));
  };

  if (!stoken)
    return (
      <div>
        <Alert
          message="无权限：SToken无效"
          description={
            <div>
              抱歉，您目前没有进入山大树洞的权限
              <br />
              请取得有效的SToken后才能访问
              <br />
            </div>
          }
          type="error"
        />
        <div>
          <p>
            PS:山大树洞是一个彻底匿名的社交平台，每位用户在这里只由系统独立生成的SToken作为用户唯一标识，不与用户任何个人信息挂钩
          </p>
          <p>您可以：</p>
          <div>
            <p>1.</p>
            <Button onClick={() => onGetStoken()}>请求生成新Token</Button>
            <p>注意：每位用户终身只有3次请求生成SToken的机会</p>
          </div>
          <div>
            <p>2.</p>
            <p>输入有效的SToken</p>
            <Form onFinish={onStokenSubmit}>
              <Form.Item
                name="stoken"
                rules={[{ required: true, message: '请输入stoken' }]}
                required={false}
              >
                <Input type="text" placeholder="stoken" />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">提交</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  return (
    <div>
      <div>
        <Button
          type="primary"
          onClick={() =>
            Modal.confirm({
              icon: null,
              title: `发布树洞`,
              content: (
                <Form
                  form={form}
                  onFinish={(e) => onPostSubmit({ ...e, parentId: 0 })}
                >
                  <Form.Item
                    name="content"
                    rules={[{ required: true, message: '请填写树洞内容' }]}
                  >
                    <TextArea placeholder="输入树洞内容" rows={4} />
                  </Form.Item>
                </Form>
              ),
              onOk: () => form.validateFields().then(() => form.submit()),
              okText: '发布',
              centered: true,
            })
          }
        >
          发布一条树洞
        </Button>
      </div>

      <List
        className="comment-list"
        header={`${holeList.length} 条树洞`}
        itemLayout="horizontal"
        dataSource={holeList.map((v) => ({
          actions: [
            <span
              onClick={() =>
                Modal.confirm({
                  icon: null,
                  title: `回复${v.holeUser.holeUserName}的树洞`,
                  content: (
                    <Form
                      form={form}
                      onFinish={(e) =>
                        onReplySubmit({ ...e, parentId: v.hole.holeId })
                      }
                    >
                      <Form.Item
                        name="content"
                        rules={[{ required: true, message: '请填写回复内容' }]}
                      >
                        <TextArea placeholder="输入回复内容" rows={4} />
                      </Form.Item>
                    </Form>
                  ),
                  onOk: () => form.validateFields().then(() => form.submit()),
                  okText: '提交',
                  centered: true,
                })
              }
            >
              回复
            </span>,
            <span>
              {replyList[v.hole.holeId] ? (
                <span onClick={() => onUnExpandReply(v.hole.holeId)}>
                  折叠评论
                </span>
              ) : (
                <span onClick={() => expandReply(v.hole.holeId)}>展开评论</span>
              )}
            </span>,
          ],
          author: v.holeUser.holeUserName,
          content: v.hole.content,
          datetime: (
            <Tooltip title={v.hole.date}>
              <span>{moment(v.hole.date).fromNow()}</span>
            </Tooltip>
          ),
          children: (
            <div>
              {replyList[v.hole.holeId] &&
                replyList[v.hole.holeId].map((item, i) => (
                  <Comment
                    key={i}
                    author={item.holeUser.holeUserName}
                    content={item.hole.content}
                    datetime={
                      <Tooltip title={item.hole.date}>
                        <span>{moment(item.hole.date).fromNow()}</span>
                      </Tooltip>
                    }
                  />
                ))}
            </div>
          ),
        }))}
        renderItem={(item) => (
          <li>
            <Comment
              actions={item.actions}
              author={item.author}
              content={item.content}
              datetime={item.datetime}
              children={item.children}
            />
          </li>
        )}
      />
    </div>
  );
};
export default Home;
