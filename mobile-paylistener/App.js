import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StatusBar
} from 'react-native';

export default function App() {
  const [serverUrl, setServerUrl] = useState('https://arjunadev.com/api/payment/listener');
  const [secretKey, setSecretKey] = useState('harispayment');
  const [amount, setAmount] = useState('10687');
  const [appName, setAppName] = useState('com.jago.app');
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  const addLog = (msg, isSuccess = true) => {
    const time = new Date().toLocaleTimeString('id-ID');
    setLogs((prev) => [
      { id: Date.now(), text: `[${time}] ${msg}`, success: isSuccess },
      ...prev
    ]);
  };

  const handleTestWebhook = async () => {
    if (!amount.trim()) {
      Alert.alert('Peringatan', 'Masukkan nominal transfer terlebih dahulu.');
      return;
    }

    setLoading(true);
    addLog(`Mengirim simulasi notifikasi transfer Rp ${Number(amount).toLocaleString('id-ID')}...`);

    try {
      const response = await fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          secret_key: secretKey.trim(),
          package_name: appName.trim(),
          title: 'Transfer Masuk Bank Jago',
          text: `Transfer masuk Rp ${amount} dari Pengetesan Mobile App PayListener`
        })
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        addLog(`✅ BERHASIL VERIFIKASI! Order ID: ${data.order_id || 'OK'}`, true);
        Alert.alert('✅ Sukses Real-time!', `Pembayaran Rp ${Number(amount).toLocaleString('id-ID')} terverifikasi di server arjunadev.com!`);
      } else {
        addLog(`⚠️ Response Server (${response.status}): ${JSON.stringify(data)}`, false);
        Alert.alert('Status Response Server', data.message || JSON.stringify(data));
      }
    } catch (error) {
      addLog(`❌ Error Koneksi: ${error.message}`, false);
      Alert.alert('Koneksi Gagal', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>⚡ Arjuna PayListener Mobile</Text>
        <Text style={styles.headerSub}>Live Android Webhook Controller v1.0</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* Server Config Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🌐 Pengaturan Target Server</Text>
          
          <Text style={styles.label}>Target Endpoint URL:</Text>
          <TextInput
            style={styles.input}
            value={serverUrl}
            onChangeText={setServerUrl}
            placeholder="https://arjunadev.com/api/payment/listener"
            placeholderTextColor="#64748b"
          />

          <Text style={styles.label}>Secret Key Auth:</Text>
          <TextInput
            style={styles.input}
            value={secretKey}
            onChangeText={setSecretKey}
            placeholder="harispayment"
            placeholderTextColor="#64748b"
          />
        </View>

        {/* Transfer Simulation Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>💸 Simulasi Notifikasi Transfer</Text>

          <Text style={styles.label}>Nama Aplikasi Bank / E-Wallet:</Text>
          <TextInput
            style={styles.input}
            value={appName}
            onChangeText={setAppName}
            placeholder="com.jago.app"
            placeholderTextColor="#64748b"
          />

          <Text style={styles.label}>Nominal Transfer (DP Testing):</Text>
          <TextInput
            style={styles.inputAmount}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="10687"
            placeholderTextColor="#64748b"
          />

          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={handleTestWebhook}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.btnSubmitText}>🚀 Kirim Webhook Transfer Realtime ➔</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Real-time Log Monitor */}
        <View style={styles.card}>
          <View style={styles.logHeader}>
            <Text style={styles.cardTitle}>📋 Real-time Activity Logs</Text>
            <TouchableOpacity onPress={() => setLogs([])}>
              <Text style={styles.btnClear}>Bersihkan Log</Text>
            </TouchableOpacity>
          </View>

          {logs.length === 0 ? (
            <Text style={styles.emptyLog}>Belum ada aktivitas webhook...</Text>
          ) : (
            logs.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.logItem,
                  item.success ? styles.logSuccess : styles.logError
                ]}
              >
                <Text style={styles.logText}>{item.text}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a'
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    backgroundColor: '#1e293b'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#38bdf8'
  },
  headerSub: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2
  },
  content: {
    flex: 1
  },
  scrollContent: {
    padding: 16,
    gap: 16
  },
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 12
  },
  label: {
    fontSize: 11,
    color: '#cbd5e1',
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 12,
    color: '#ffffff'
  },
  inputAmount: {
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#38bdf8'
  },
  btnSubmit: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#0284c7',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0284c7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  btnSubmitText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13
  },
  logHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  btnClear: {
    fontSize: 11,
    color: '#38bdf8',
    fontWeight: 'bold'
  },
  emptyLog: {
    fontSize: 11,
    color: '#64748b',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 16
  },
  logItem: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 8
  },
  logSuccess: {
    backgroundColor: 'rgba(52, 211, 153, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.3)'
  },
  logError: {
    backgroundColor: 'rgba(248, 113, 113, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(248, 113, 113, 0.3)'
  },
  logText: {
    fontSize: 11,
    color: '#f8fafc',
    fontFamily: 'monospace'
  }
});
