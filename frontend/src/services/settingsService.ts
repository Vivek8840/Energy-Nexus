import { ApiResponse, UserProfile, SystemDetails, NotificationSettings, SecuritySettings } from '../types';
import { APP_CONFIG } from '../utils/constants';

class SettingsService {
  private baseUrl = `${APP_CONFIG.API_BASE_URL}/settings`;

  async getUserProfile(): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await fetch(`${this.baseUrl}/profile`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        data: {} as UserProfile,
        error: 'Failed to fetch user profile'
      };
    }
  }

  async updateProfile(profileData: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    try {
      const response = await fetch(`${this.baseUrl}/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        data: {} as UserProfile,
        error: 'Failed to update profile'
      };
    }
  }

  async getSystemDetails(): Promise<ApiResponse<SystemDetails>> {
    try {
      const response = await fetch(`${this.baseUrl}/system`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        data: {} as SystemDetails,
        error: 'Failed to fetch system details'
      };
    }
  }

  async getNotificationSettings(): Promise<ApiResponse<NotificationSettings>> {
    try {
      const response = await fetch(`${this.baseUrl}/notifications`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        data: {} as NotificationSettings,
        error: 'Failed to fetch notification settings'
      };
    }
  }

  async updateNotificationSettings(settings: NotificationSettings): Promise<ApiResponse<NotificationSettings>> {
    try {
      const response = await fetch(`${this.baseUrl}/notifications`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        data: {} as NotificationSettings,
        error: 'Failed to update notification settings'
      };
    }
  }

  async getSecuritySettings(): Promise<ApiResponse<SecuritySettings>> {
    try {
      const response = await fetch(`${this.baseUrl}/security`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        data: {} as SecuritySettings,
        error: 'Failed to fetch security settings'
      };
    }
  }

  async updateSecuritySettings(settings: SecuritySettings): Promise<ApiResponse<SecuritySettings>> {
    try {
      const response = await fetch(`${this.baseUrl}/security`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        data: {} as SecuritySettings,
        error: 'Failed to update security settings'
      };
    }
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<{ success: boolean }>> {
    try {
      const response = await fetch(`${this.baseUrl}/change-password`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        data: { success: false },
        error: 'Failed to change password'
      };
    }
  }
}

export default new SettingsService();