import { useEffect } from 'react';
import StudentLayout from '../../componants/StudentLayOut'
import { JitsiMeeting } from '@jitsi/react-sdk';
function Meet() {
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    return (
        <StudentLayout>
            <div className='w-full h-screen'>
                <JitsiMeeting
                    domain={'meet.jit.si'}
                    roomName="RoomName"
                    configOverwrite={{
                        startWithAudioMuted: true,
                        disableModeratorIndicator: true,
                        startScreenSharing: true,
                        enableEmailInStats: false
                    }}
                    userInfo={{
                        displayName: 'User Name',
                        email: 'wYHr5@example.com',
                    }}
                    interfaceConfigOverwrite={{
                        SHOW_JITSI_WATERMARK: false,
                        SHOW_WATERMARK_FOR_GUESTS: false,
                    }}
                    getIFrameRef={(iframeRef) => {
                        iframeRef.style.width = '100%';
                        iframeRef.style.height = '90%';
                    }}
                />


            </div>
        </StudentLayout>
    )
}

export default Meet
