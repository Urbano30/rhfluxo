import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
// import { useAuthStore } from '@repo/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.topShape} />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.logo}>
              <Text style={{ color: "#f7863a" }}>rh</Text>
              <Text style={{ color: "#4ea5b9" }}>fluxo</Text>
            </Text>
            <Text style={styles.title}>Bem-vindo de volta!</Text>
            <Text style={styles.subtitle}>Faça login para continuar</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Usuário</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Digite seu usuário"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  placeholderTextColor="#94a3b8"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Senha</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Digite sua senha"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#94a3b8"
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={{ color: "#94a3b8" }}>
                    {showPassword ? "Hide" : "Show"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Entrar</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.versionText}>Versão 1.0.0</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    flexGrow: 1,
  },
  topShape: {
    position: "absolute",
    top: -100,
    right: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#4ea5b9",
    opacity: 0.1,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 80,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    fontFamily: "BalooBhaina2_700Bold",
    fontSize: 56,
    marginBottom: 16,
  },
  title: {
    fontFamily: "BalooBhaina2_700Bold",
    fontSize: 28,
    color: "#0f172a",
  },
  subtitle: {
    fontFamily: "BalooBhaina2_400Regular",
    fontSize: 16,
    color: "#64748b",
    marginTop: 4,
  },
  form: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "BalooBhaina2_600SemiBold",
    fontSize: 14,
    color: "#0f172a",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    height: 52,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontFamily: "BalooBhaina2_400Regular",
    fontSize: 16,
    color: "#0f172a",
  },
  eyeIcon: {
    padding: 8,
  },
  forgotPassword: {
    fontFamily: "BalooBhaina2_500Medium",
    color: "#4ea5b9",
    fontSize: 14,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: "#f7863a",
    height: 52,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: {
    fontFamily: "BalooBhaina2_600SemiBold",
    color: "#ffffff",
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#e2e8f0",
  },
  dividerText: {
    fontFamily: "BalooBhaina2_400Regular",
    color: "#64748b",
    marginHorizontal: 16,
  },
  ssoButton: {
    height: 52,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#0d9488",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  ssoButtonText: {
    fontFamily: "BalooBhaina2_600SemiBold",
    color: "#0d9488",
    fontSize: 16,
  },
  versionText: {
    fontFamily: "BalooBhaina2_400Regular",
    color: "#94a3b8",
    fontSize: 12,
    textAlign: "center",
    marginTop: 40,
  },
});
