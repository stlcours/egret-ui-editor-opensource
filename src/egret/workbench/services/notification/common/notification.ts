import { INotificationService, IMessage } from 'egret/platform/notification/common/notifications';
import { Toast } from '../browser/toasts';


enum MsgType {
	INFO = 'info',
	WARNING = 'warning',
	ERROR = 'error'
}

const INFO_COLOR = '#ffffff';
const WARNING_COLOR = '#edc527';
const ERROR_COLOR = '#ed2727';

/**
 * 简单通知
 */
export class SimpleNotificationService implements INotificationService {

	_serviceBrand: any;

	private messages: { msg: IMessage, type: MsgType }[] = [];
	private toast: Toast = new Toast();
	constructor() {
	}

	/**
	 * 报告 info 
	 */
	public info(message: IMessage): void {
		this.messages.push({ msg: message, type: MsgType.INFO });
		this.doPopup();
	}

	/**
	 * 报告warn.
	 */
	public warn(message: IMessage): void {
		this.messages.push({ msg: message, type: MsgType.WARNING });
		this.doPopup();
	}

	/**
	 * 报告errors. 
	 */
	public error(message: IMessage): void {
		this.messages.push({ msg: message, type: MsgType.ERROR });
		this.doPopup();
	}

	private doPopup(): void {
		if (this.messages.length > 0) {
			const msg = this.messages.shift();
			if (msg.type == MsgType.INFO) {
				this.toast.color = INFO_COLOR;
			} else if (msg.type == MsgType.WARNING) {
				this.toast.color = WARNING_COLOR;
			} else if (msg.type == MsgType.ERROR) {
				this.toast.color = ERROR_COLOR;
			}
			this.toast.onHided = () => this.hided_handler();
			const content = msg.msg.content;
			const duration = msg.msg.duration ? msg.msg.duration * 1000 : 3 * 1000;
			this.toast.show(content, duration);
		}
	}

	private hided_handler(): void {
		this.doPopup();
	}
}