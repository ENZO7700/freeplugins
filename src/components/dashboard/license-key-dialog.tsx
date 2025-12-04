
'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { getOrCreateLicenseKey } from '@/lib/firestore-service';

interface LicenseKeyDialogProps {
  pluginId: string;
  userId: string;
  trigger: React.ReactNode;
}

export function LicenseKeyDialog({ pluginId, userId, trigger }: LicenseKeyDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [licenseKey, setLicenseKey] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [hasCopied, setHasCopied] = React.useState(false);
  const { toast } = useToast();

  const fetchKey = React.useCallback(async () => {
    if (!isOpen) return;
    setIsLoading(true);
    setLicenseKey(null);
    setError(null);
    try {
      const key = await getOrCreateLicenseKey(userId, pluginId);
      if (key) {
        setLicenseKey(key);
      } else {
        setError('Licenčný kľúč nebol nájdený alebo sa ho nepodarilo vytvoriť.');
      }
    } catch (err) {
      console.error('Chyba pri načítavaní licenčného kľúča:', err);
      setError('Nepodarilo sa načítať licenčný kľúč. Skúste to prosím znova.');
    } finally {
      setIsLoading(false);
    }
  }, [isOpen, userId, pluginId]);

  React.useEffect(() => {
    fetchKey();
  }, [fetchKey]);

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  const handleCopy = () => {
    if (licenseKey) {
      navigator.clipboard.writeText(licenseKey);
      setHasCopied(true);
      toast({
        title: 'Skopírované!',
        description: 'Licenčný kľúč bol skopírovaný do schránky.',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Váš licenčný kľúč</DialogTitle>
          <DialogDescription>
            Tento kľúč slúži na aktiváciu vášho zakúpeného pluginu.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoading && <Skeleton className="h-10 w-full" />}
          {error && (
            <div className="flex items-center justify-center h-20 text-destructive">
              <p>{error}</p>
            </div>
          )}
          {licenseKey && (
            <div className="flex items-center gap-2 p-3 rounded-md bg-muted border">
              <code className="text-sm sm:text-base font-mono flex-grow break-all">{licenseKey}</code>
              <Button size="icon" variant="ghost" onClick={handleCopy} aria-label="Skopírovať licenčný kľúč">
                {hasCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
