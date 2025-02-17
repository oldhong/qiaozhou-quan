import React from 'react';
import { View, navigateTo } from 'remax/wechat';
import styles from './index.less';
import Image from '@/components/image';
import Block from '@/components/block';
import userInfoStores from '@/stores/userInfo';
import { Tag, Row, Col, Icon } from 'anna-remax-ui';
import UserCard from '@/components/userCard';
import { usePageEvent } from 'remax/macro';

type TagItemProps = {
  onTap?: () => void;
  text?: React.ReactNode;
  image?: string;
  icon?: string;
};

const TagItem: React.FC<TagItemProps> = ({
  text,
  icon,
  image = '/images/test/123.jpg',
  onTap,
}) => {
  return (
    <Col span={6}>
      <View onTap={onTap}>
        <View className={styles['tag-image']}>
          {icon ? (
            <Icon type={icon} size='60rpx' color='#666' />
          ) : (
            <Image height='100rpx' width='100rpx' src={image} />
          )}
        </View>
        <View className={styles['body-text']}>{text}</View>
      </View>
    </Col>
  );
};

const Index = () => {
  const { userInfo, getUserInfo, isVip } = userInfoStores.useContainer();
  usePageEvent('onShow', getUserInfo);
  return (
    <View className={styles.my}>
      <UserCard />
      {isVip || (
        <View
          className={styles.title}
          onTap={() =>
            navigateTo({
              url: '/pages/vips/index',
            })
          }>
          <View>开通会员获，获得更多惊喜权益</View>
          <Tag color='yellow'>开通会员</Tag>
        </View>
      )}
      <View className={styles.body}>
        <Block title='我的账户'>
          <Row gutter={16}>
            <TagItem
              onTap={() =>
                navigateTo({
                  url: '/pages/userInfo/index',
                })
              }
              icon='vipcard'
              text='个人认证'
            />
            <TagItem
              onTap={() =>
                navigateTo({
                  url: '/pages/vips/index',
                })
              }
              icon='vip'
              text='会员中心'
            />
          </Row>
        </Block>
        <Block title='商家服务'>
          <Row gutter={16}>
            {userInfo?.roleName === '商家' ? (
              <TagItem
                text='添加活动'
                icon='activity'
                onTap={() =>
                  navigateTo({
                    url: '/pages/activitySetting/index',
                  })
                }
              />
            ) : (
              <View />
            )}
            {userInfo?.roleName === '商家' ? (
              <TagItem
                icon='shop'
                text='商家信息'
                onTap={() =>
                  navigateTo({
                    url: '/pages/shopInfo/index',
                  })
                }
              />
            ) : (
              <TagItem
                icon='shop'
                text='成为商家'
                onTap={() =>
                  navigateTo({
                    url: '/pages/shopApply/index',
                  })
                }
              />
            )}
          </Row>
        </Block>
        <Block title='其他服务'>
          <Row gutter={16}>
            <TagItem
              icon='settings'
              text='设置'
              onTap={() =>
                navigateTo({
                  url: '/pages/setting/index',
                })
              }
            />
          </Row>
        </Block>
      </View>
    </View>
  );
};
export default Index;
