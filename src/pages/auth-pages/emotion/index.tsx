// 主要展示的css-in-js @emotionjs的基本用法
// 更详细用法看 https://emotion.sh/docs/introduction
import React from 'react'
import { css, cx } from '@emotion/css'
import styled from '@emotion/styled'
import { Button } from 'antd';
import { useAuth } from 'context/auth-context';

const fontColor = 'red'

type UserInfo = {
	name: string
	age: number
}

export const Emotion: React.FC<UserInfo> = (props) => {
    const context = useAuth()
    console.log(context)
    return <div>
        <UserMessage color='green'>
            <p className={cx(user, false && userBlue)}>{ props.name }</p>
            <p className='age'>{ props.age }</p>
            <Button type="primary">Button</Button>
        </UserMessage>
    </div>
}

const UserMessage = styled.div`
    font-size: 24px;
    .age {
        color: ${props => props.color};
        font-size: 18px;
    }
`

const user = css`
    color: ${fontColor};
    font-size: 20px;
`

const userBlue = css`
    color: blue;
`