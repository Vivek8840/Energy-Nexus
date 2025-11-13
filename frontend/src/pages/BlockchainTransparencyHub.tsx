import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Shield, Search, CheckCircle, Clock, Hash, Zap, Eye, Lock, Database, TrendingUp } from 'lucide-react';

interface TransactionRecord {
  id: string;
  hash: string;
  timestamp: string;
  from: string;
  to: string;
  energy: number;
  value: number;
  status: 'verified' | 'pending';
}

// Mock blockchain data - todo: remove mock functionality  
const mockTransactions: TransactionRecord[] = [
  {
    id: "TXN-001",
    hash: "0x7a5f6b2c8d9e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c",
    timestamp: "2024-01-15 14:30:25",
    from: "Rajesh Kumar (DLF Phase 2)",
    to: "Priya Sharma (Sector 21)",
    energy: 4.5,
    value: 27.90,
    status: 'verified'
  },
  {
    id: "TXN-002", 
    hash: "0x3c8d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e",
    timestamp: "2024-01-15 13:15:42",
    from: "Amit Patel (Cyber City)",
    to: "Sunita Verma (Golf Course Road)",
    energy: 2.1,
    value: 12.18,
    status: 'verified'
  },
  {
    id: "TXN-003",
    hash: "0x9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b",
    timestamp: "2024-01-15 15:45:18",
    from: "Vikram Singh (MG Road)",
    to: "Neha Gupta (Sector 14)",
    energy: 3.2,
    value: 20.80,
    status: 'pending'
  }
];

const BlockchainTransparencyHub: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<TransactionRecord | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate API call - todo: remove mock functionality
    setTimeout(() => {
      const result = mockTransactions.find(t => 
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.hash.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResult(result || null);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50 min-h-screen">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 bg-green-500/20 rounded-full border border-green-500/30 mb-6 shadow-lg"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <Shield className="w-5 h-5 text-green-600 mr-3" />
            <span className="text-green-600 font-semibold text-lg tracking-wide">BLOCKCHAIN SECURITY</span>
          </motion.div>
          <motion.h2
            className="text-4xl font-extrabold mb-4 text-primary-900"
            variants={itemVariants}
          >
            The Blockchain Transparency Hub
          </motion.h2>
          <motion.p
            className="text-lg text-primary-700 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Every transaction, verified & secure. Search any transaction by ID or hash to see complete details on our immutable ledger.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Transaction Search */}
          <motion.div variants={itemVariants}>
            <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold">
                  <Search className="w-6 h-6 mr-3 text-primary-600" />
                  Transaction Lookup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-5">
                  <label className="block text-sm font-medium text-primary-800">
                    Search by Transaction ID or Hash
                  </label>
                  <div className="flex space-x-3">
                    <Input
                      placeholder="Enter TXN-001 or 0x7a5f..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="font-mono"
                      data-testid="input-transaction-search"
                    />
                    <Button 
                      onClick={handleSearch}
                      disabled={isSearching || !searchQuery.trim()}
                      data-testid="button-search-transaction"
                      className="flex items-center justify-center px-5"
                    >
                      {isSearching ? (
                        <motion.div 
                          className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"
                          initial={{ rotate: 0 }}
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        />
                      ) : (
                        <Search className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                </div>

                <AnimatePresence>
                  {searchResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="bg-green-50 border-green-400 shadow-inner rounded-lg">
                        <CardContent className="p-5 space-y-4" data-testid="search-result">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-base text-primary-900">{searchResult.id}</span>
                            <Badge variant={searchResult.status === 'verified' ? 'default' : 'secondary'}>
                              {searchResult.status === 'verified' ? (
                                <CheckCircle className="w-4 h-4 mr-1" />
                              ) : (
                                <Clock className="w-4 h-4 mr-1" />
                              )}
                              {searchResult.status}
                            </Badge>
                          </div>
                          
                          <div className="text-sm text-primary-800 space-y-1">
                            <div><strong>Hash:</strong> {searchResult.hash}</div>
                            <div><strong>Timestamp:</strong> {searchResult.timestamp}</div>
                            <div><strong>From:</strong> {searchResult.from}</div>
                            <div><strong>To:</strong> {searchResult.to}</div>
                            <div><strong>Energy:</strong> {searchResult.energy} kWh</div>
                            <div><strong>Value:</strong> ₹{searchResult.value}</div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!searchResult && searchQuery && !isSearching && (
                  <motion.div
                    className="text-center p-6 text-primary-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Hash className="w-10 h-10 mx-auto mb-3 opacity-60" />
                    <p>No transaction found matching your search.</p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Transactions Ledger */}
          <motion.div variants={itemVariants}>
            <Card className="shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl font-semibold">
                  <span className="flex items-center text-primary-700">
                    <Zap className="w-6 h-6 mr-3" />
                    Recent Transactions
                  </span>
                  <Badge variant="outline" className="text-green-700 border-green-700">
                    {mockTransactions.length} verified
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {mockTransactions.map((tx, index) => (
                    <motion.div 
                      key={tx.id}
                      className="flex items-start justify-between p-4 rounded-lg border border-gray-200 hover:bg-green-50 transition-colors cursor-pointer"
                      data-testid={`transaction-row-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)" }}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-mono text-base text-primary-900">{tx.id}</span>
                          {tx.status === 'verified' ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <Clock className="w-5 h-5 text-yellow-500" />
                          )}
                        </div>
                        <div className="text-sm text-primary-800 space-y-0.5">
                          <div>{tx.energy} kWh → ₹{tx.value}</div>
                          <div className="truncate">{tx.from} → {tx.to}</div>
                          <div>{tx.timestamp}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t text-center text-sm text-primary-600">
                  <Database className="w-5 h-5 mx-auto mb-2 text-green-600" />
                  <p>All transactions are cryptographically secured and permanently recorded</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30 rounded-xl shadow-lg">
            <CardContent className="p-8">
              <Shield className="w-14 h-14 text-green-600 mx-auto mb-6" />
              <h3 className="text-2xl font-extrabold mb-3 text-primary-900">Immutable Energy Passbook</h3>
              <p className="text-lg text-primary-800 max-w-xl mx-auto">
                Every energy transaction is recorded forever on our blockchain, providing complete transparency and trust in the system.
              </p>
              <motion.div
                className="mt-8 flex justify-center space-x-8 text-green-600"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, staggerChildren: 0.2 }}
              >
                <motion.div
                  className="flex flex-col items-center"
                  whileHover={{ scale: 1.2 }}
                >
                  <Eye className="w-8 h-8 mb-2" />
                  <span className="text-sm font-semibold">Transparent</span>
                </motion.div>
                <motion.div
                  className="flex flex-col items-center"
                  whileHover={{ scale: 1.2 }}
                >
                  <Lock className="w-8 h-8 mb-2" />
                  <span className="text-sm font-semibold">Secure</span>
                </motion.div>
                <motion.div
                  className="flex flex-col items-center"
                  whileHover={{ scale: 1.2 }}
                >
                  <TrendingUp className="w-8 h-8 mb-2" />
                  <span className="text-sm font-semibold">Reliable</span>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default BlockchainTransparencyHub;
