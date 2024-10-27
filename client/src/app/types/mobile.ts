export interface ChatBubbleProps {
  username: string;
  message: string;
  time: string;
  role: string;
  message_id: string;
  player: string;
}

export interface TabPanelProps {
  value: number;
  index: number;
  player: string;
}

export interface ChatResponseProps {
  message_id: string;
  player_name: string;
  player_role: string;
  message: string;
  created_at: string;
}

export interface CommentFormProps {
  message: string;
  setMessage: (message: string) => void;
  setEncodedTimestamp: (encodedTimestamp: string) => void;
  index: number;
}

export interface UserNameInputProps {
  maxLength: number;
  player: string;
}

export interface PlayerProps {
  player: string;
}

export interface UseGameStateProps {
  trialId: string;
  player: string;
}
