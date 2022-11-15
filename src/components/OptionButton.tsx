import { FC } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

interface Props {
  onPress(): void;
  text: string;
  disabled?: boolean;
  correct?: boolean;
}

export const OptionButton: FC<Props> = ({
  onPress,
  text,
  disabled = false,
  correct = undefined,
}) => (
    <TouchableOpacity
      style={[
        styles.buttonStyle,
        correct && { backgroundColor: "#22c55e" },
        correct === false && { backgroundColor: "#ef4444" },
        correct === undefined && { backgroundColor: "white" },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.textStyle,
          correct !== undefined ? { color: "white" } : { color: "black"}
        ]}
      >
        { text}
      </Text>
    </TouchableOpacity>
  );

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 32,
    justifyContent: "center",
    alignItems: "center"
  },
  textStyle: {
    fontFamily: "Cousine"
  }
});
